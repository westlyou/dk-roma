# -*- coding: utf-8 -*-

from odoo import models, fields, api


class Contacts(models.Model):
    _inherit = 'res.partner'

    phone = fields.Char()
    mobile = fields.Char()
    email = fields.Char()

    def email_unique(self): pass
    def phone_unique(self): pass
    def mobile_unique(self): pass



