# -*- coding: utf-8 -*-

from odoo import models, fields, api


class Contacts(models.Model):
    _inherit = 'res.partner'

    phone = fields.Char()
    mobile = fields.Char()
    email = fields.Char()

    _sql_constraints = [
        ('email_unique', 'unique(email)', 'Email address must be unique!'),
        ('phone_unique', 'unique(phone)', 'Phone number must be unique!'),
        ('mobile_unique', 'unique(mobile)', 'Mobile number must be unique!'),
    ]



