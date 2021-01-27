# -*- coding: utf-8 -*-

import json

from odoo import http
from odoo.http import request


class Dkaroma(http.Controller):
    # @http.route('/dkaroma/dkaroma/', auth='public')
    # def index(self, **kw):
    #     return "Hello, world"

    @http.route('/', auth='public')
    def home(self, **kw):
        return http.request.render('dkaroma.home')

    @http.route('/dkaroma/shop/get-child-categories', auth='public')
    def get_categories(self, parent, **kw):
        parent_obj = http.request.env["product.public.category"].sudo().search([('name', '=', parent)], limit=1)
        if not parent:
            children = [{
                "name": child.name,
                "sequence": child.sequence
            } for child in http.request.env["product.public.category"].sudo().search([('parent_id', '=', False)])]
        elif not parent_obj:
            return "Error: No Such Category"
        else:
            children = [{
                "name": child.name,
                "sequence": child.sequence
            } for child in parent_obj.child_id]

        return json.dumps(children)

    @http.route('/dkaroma/shop/get-products', type='http', auth="public", website=True)
    def products(self, **post):
        products = http.request.env["product.template"].sudo().search([])
        
        return request.render("dkaroma.products", {"products": products})

    @http.route('/dkaroma/shop/get-product', type='http', auth="public", website=True)
    def product(self, pid, **post):
        product = http.request.env["product.template"].sudo().search([('id', '=', int(pid))], limit=1)
        
        return request.render("dkaroma.product_details", {"product": product})


    # @http.route('/dkaroma/dkaroma/objects/<model("dkaroma.dkaroma"):obj>/', auth='public')
    # def object(self, obj, **kw):
    #     return http.request.render('dkaroma.object', {
    #         'object': obj
    #     })
