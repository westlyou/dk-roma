# -*- coding: utf-8 -*-

from odoo import models, fields, api


class ECommerce(models.Model):
    _name = 'dkaroma.home'
    _description = 'Home Page'

    name = fields.Char("Name")
    banner_text_small_1 = fields.Char()
    banner_text_small_2 = fields.Char()
    banner_image_1 = fields.Binary()
    banner_image_2 = fields.Binary()
    
    header_text_big = fields.Char()
    header_text_small = fields.Char()
    
    card_1_text_big = fields.Char()
    card_1_text_small = fields.Char()
    card_1_image = fields.Binary()

    card_2_text_big = fields.Char()
    card_2_text_small = fields.Char()
    card_2_image = fields.Binary()

    scroll_products_1_text_big = fields.Char()
    scroll_products_1_text_small = fields.Char()
    scroll_products_1 = fields.Many2many("dkaroma.home.products", "scroll_products_1_tbl")

    card_3_text_big = fields.Char()
    card_3_text_small = fields.Char()
    card_3_image = fields.Binary()

    card_4_text_big = fields.Char()
    card_4_text_small = fields.Char()
    card_4_image = fields.Binary()

    card_5_text_big = fields.Char()
    card_5_text_small = fields.Char()
    card_5_image = fields.Binary()

    card_6_text_big = fields.Char()
    card_6_text_small = fields.Char()
    card_6_image = fields.Binary()

    scroll_products_2_text_big = fields.Char()
    scroll_products_2_text_small = fields.Char()
    scroll_products_2 = fields.Many2many("dkaroma.home.products", "scroll_products_2_tbl")


class ScrollProducts(models.Model):
    _name = 'dkaroma.home.products'
    _description = 'Scroll Products'

    name = fields.Many2one("product.template", string="Product")
    image_1920 = fields.Binary(string="Image", related="name.image_1920")
    list_price = fields.Float(string="Price", related="name.list_price")