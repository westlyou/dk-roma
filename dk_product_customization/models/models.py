# -*- coding: utf-8 -*-

from odoo import models, fields, api


class Product(models.Model):
    _inherit = 'product.template'

    name_simplified_chinese = fields.Char(string="Simplified Chinese Name")
    name_traditional_chinese = fields.Char(string="Traditional Chinese Name")
    name_german = fields.Char(string="German Name")
    gtin = fields.Char(string="Global Trade Item Number")
    botanical_name = fields.Char(string="Botanical Name")
    plant_part = fields.Char(string="Plant Part")
    extraction = fields.Char(string="Extraction")
    origin = fields.Char(string="Origin")
    batch_number = fields.Char(string="Batch Number")
    location = fields.Char(string="Location")
    product_info_english_1 = fields.Text(string="Product Information 1")
    product_info_english_2 = fields.Text(string="Product Information 2")
    product_info_english_3 = fields.Text(string="Product Information 3")
    product_info_english_4 = fields.Text(string="Product Information 4")
    product_info_chinese_1 = fields.Text(string="Product Information 1")
    product_info_chinese_2 = fields.Text(string="Product Information 2")
    product_info_chinese_3 = fields.Text(string="Product Information 3")
    product_info_chinese_4 = fields.Text(string="Product Information 4")
    english_tags = fields.Char(string="Product Tags")
    chinese_tags = fields.Char(string="Product Tags")
    english_key_words = fields.Char(string="Product Keywords")
    chinese_key_words = fields.Char(string="Product Keywords")



