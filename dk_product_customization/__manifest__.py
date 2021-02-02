# -*- coding: utf-8 -*-
{
    'name': "DK Product Customization",

    'summary': """
        Extends and adds new fields to the product model""",

    'description': """
        Extends and adds new fields to the product model
    """,

    'author': "Ehio Technologies",
    'website': "https://www.ehiotech.com",


    'category': 'Sales',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'product', 'stock', 'website_sale'],

    # always loaded
    'data': [
        'views/views.xml',
        'views/templates.xml',
    ],

}
