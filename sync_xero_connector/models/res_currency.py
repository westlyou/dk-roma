# -*- coding: utf-8 -*-
# Part of Odoo. See COPYRIGHT & LICENSE files for full copyright and licensing details.

from odoo import api, fields, models, _
# from odoo.http import request


class ResCurrency(models.Model):
    _inherit = 'res.currency'
    _description = 'Currency'

    symbol = fields.Char(help="Currency sign, to be used when printing amounts.", required=False)

    def import_currency(self, currency_list, xero, xero_account_id):
        """
            Map: currency name(Odoo) with currency code(Xero)

            Create a currency in odoo if currency is not available for given
            name and company.

            If Currency record is available then it will update that particular record.
        """
        mismatch_log = self.env['mismatch.log']
        for currency in currency_list:
            inactive_currency = self.search([('name', '=', currency.get('Code')), ('active', '=', False)])
            active_currency = self.search([('name', '=', currency.get('Code')), ('active', '=', True)])
            try:
                if inactive_currency:
                    inactive_currency[0].write({'active': True})
                    self._cr.commit()
                elif not inactive_currency and not active_currency:
                    self.create({'name': currency.get('Code'), 'active': True})
                    self._cr.commit()
            except Exception as e:
                mismatch_log.create({'name': currency.get('Code'),
                                     'source_model': 'res.currency',
                                     'description': e,
                                     'date': fields.Datetime.now(),
                                     'option': 'import',
                                     'xero_account_id': xero_account_id,
                                     })
                continue

    @api.model
    def _get_conversion_rate_by_amount(self, from_currency, to_currency):
        """ Convert the amount as per xero currency rates """

        to_currency = to_currency.with_env(self.env)
        return to_currency.rate / from_currency

    def _convert(self, from_amount, to_currency, company, date, round=True):
        """Returns the converted amount of ``from_amount``` from the currency
           ``self`` to the currency ``to_currency`` for the given ``date`` and
           company.

           :param company: The company from which we retrieve the convertion rate
           :param date: The nearest date from which we retriev the conversion rate.
           :param round: Round the result or not
        """
        self, to_currency = self or to_currency, to_currency or self
        assert self, "convert amount from unknown currency"
        assert to_currency, "convert amount to unknown currency"
        assert company, "convert amount from unknown company"
        assert date, "convert amount from unknown date"
        # apply conversion rate
        if self == to_currency:
            to_amount = from_amount
        else:
            # if request.session.get('CurrencyRate'):
            if self._context.get('CurrencyRate'):
                to_amount = from_amount * self._get_conversion_rate_by_amount(self._context.get('CurrencyRate'),to_currency)
            else:
                to_amount = from_amount * self._get_conversion_rate(self, to_currency, company, date)
        # apply rounding
        return to_currency.round(to_amount) if round else to_amount
