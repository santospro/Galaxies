Ext.define('OUIsp.Galaxies.View.Action', {
	extend: 'Ext.Widget',
	xtype: 'OUIsp_Galaxies_Action',
	requires: [
		'OUIsp.Galaxies.View.ActionController'
	],
	controller: 'actionController',

	/**
	 * EVENTOS:
	 * - evtap: Se dispara cuando se toca el botón
	 */

	config: {
		sbTooltip: null,
		openId: null,
		obTheme: null,
		sbIcon: null
	},
	setSbTooltip: function() {
		//Si ya está inicializado, warn diciendo que no se puede cambiar después de creado
	},
	setOpenId: function() {
		//Si ya está inicializado, warn diciendo que no se puede cambiar después de creado
	},
	setObTheme: function() {
		//Si ya está inicializado, warn diciendo que no se puede cambiar después de creado
	},
	setSbIcon: function() {
		//Si ya está inicializado, warn diciendo que no se puede cambiar después de creado
	},
	
	fobComponent: function() {

	}
});