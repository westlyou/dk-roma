# -*- coding: utf-8 -*-
{
    'name': "DKAroma E-commerce",

    'summary': """
        E-commerce website""",

    'description': """
        E-commerce website
    """,

    'author': "Ehio Technologies",
    'website': "https://www.ehiotech.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/13.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'E-commerce',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'website'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        # 'views/templates.xml',
        'views/Home.xml',
        'views/Cart.xml',
        'views/Checkout.xml',
        'views/Checkout-login.xml',
        'views/ProductDetails.xml',
        'views/Products.xml',
        'views/Login.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}
