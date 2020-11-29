# -*- coding: utf-8 -*-
from odoo import http
from odoo.addons.website.controllers.main import Website


class Website(Website):
    @http.route(auth='public')
    def index(self, data={}, **kw):
        super(Website, self).index(**kw)
        return http.request.render('eshop_site.home', data)


# class EshopSite(http.Controller):
#     @http.route('/eshop_site/eshop_site/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/eshop_site/eshop_site/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('eshop_site.listing', {
#             'root': '/eshop_site/eshop_site',
#             'objects': http.request.env['eshop_site.eshop_site'].search([]),
#         })

#     @http.route('/eshop_site/eshop_site/objects/<model("eshop_site.eshop_site"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('eshop_site.object', {
#             'object': obj
#         })
