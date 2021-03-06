// incluye la libreria 'createJS
// NO BORRAR
ServerFileRequest.ReplaceMeLibrary("OUIspecialized/Galaxies/resources/libs/easeljs-NEXT.min.js");
ServerFileRequest.ReplaceMeLibrary("OUIspecialized/Galaxies/resources/libs/tweenjs-NEXT.min.js");
ServerFileRequest.ReplaceMeLibrary("OUIspecialized/Galaxies/resources/libs/txt.min.js");

Ext.define('OUIsp.Galaxies.View.GalaxyComponent', {
	extend: 'OUI.Container.Container',
	xtype: 'OUIsp_Galaxies_GalaxyComponent',
	requires: [
		'OUIsp.Galaxies.View.GalaxyComponentController',
		'OUIsp.Galaxies.View.Galaxy'
	],
	controller: 'galaxyComponentController',

	config: {
		//título del contenedor de galaxias
		sbTitle: null,
		//Indica si el componente debe estar en modo solo lectura
		blReadOnly: false,
		//Indica si la galaxia es requerida
		blRequired: false,
		//Convención para indicar que significa la línea continua
		sbSolidConvention: null,
		//Convención para indicar que significa la línea punteada
		sbDottedConvention: null,
		//Record de la galaxia inicial
		obRecord: null,
		//Campo de despliegue de la galaxia inicial
		sbDisplayField: null,
		//Tipo de linea de la galaxia inicial
		sbLineType: Galaxies_Util.cobLINE.SOLID,
		//Tema de la galaxia inicial
		obTheme: Galaxies_Util.cobTHEME.GRAY,
		//Configuración por defecto de las galaxias hijas de la galaxia inicial
		defaultChildConfig: {},
		//Galaxias hijas de la galaxia inicial
		arChildren: [],
		//Botones de acción de la galaxia inicial
		arActions: []
	},

	initialize: function() {
		//Adiciona una clase css para el componente
		//Adiciona el html base del componente: título y canvas
		var me = this;
		me.addCls("o-galaxy-comp");
		me.setHtml(me.fsbTemplate());
		//Se llama al callParent para inicializar la clase genérica
		me.callParent();
	},

	/**
	 * @method fsbTemplate
	 * Retorna el html base del componente: título, canvas y convenciones
	 * @return {String}    HTML base del componente
	 * @private
	 */
	fsbTemplate: function() {
		return "<div class='o-galaxy-title'></div><canvas class='o-galaxy-stage' width='600' height='500' style='border:1px solid rgba(255, 0, 0, 0.3)'></canvas><div class='o-galaxy-convention'></div>";
	},

	updateSbTitle: function(isbNewTitle, isbOldTitle) {
		var me = this;
		//Si el componente ya está inicializado
		if (me.initialized) {
			//Se ajusta el contenido del título
			me.fireEvent("ievAdjustTitle", isbNewTitle);
		}
	},

	updateSbSolidConvention: function(isbNewValue, isbOldValue) {
		this.buildConventions();
	},
	updateSbDottedConvention: function(isbNewValue, isbOldValue) {
		this.buildConventions();
	},

	updateBlReadOnly: function(iblNewValue, iblOldValue) {
		var me = this;
		//Si está inicializado
		if (me.initialized) {
			//Se traspasa esta propiedad a la galaxia inicial
			me.fireEvent("ievupdateproperty", "BlReadOnly", iblNewValue);
		}
	},
	updateBlRequired: function(iblNewValue, iblOldValue) {
		var me = this;
		//Si está inicializado

	},
	updateObRecord: function(iobNewValue, iobOldValue) {
		var me = this;
		//Si está inicializado
		if (me.initialized) {
			//Se traspasa esta propiedad a la galaxia inicial
			me.fireEvent("ievupdateproperty", "ObRecord", iobNewValue);
		}
	},
	updateSbDisplayField: function(isbNewValue, isbOldValue) {
		var me = this;
		//Si está inicializado
		if (me.initialized) {
			//Se traspasa esta propiedad a la galaxia inicial
			me.fireEvent("ievupdateproperty", "SbDisplayField", isbNewValue);
		}
	},
	updateSbLineType: function(isbNewValue, isbOldValue) {
		var me = this;
		//Si está inicializado
		if (me.initialized) {
			//Se traspasa esta propiedad a la galaxia inicial
			me.fireEvent("ievupdateproperty", "SbLineType", isbNewValue);
		}
	},
	updateObTheme: function(iobNewValue, iobOldValue) {
		var me = this;
		//Si está inicializado
		if (me.initialized) {
			//Se traspasa esta propiedad a la galaxia inicial
			me.fireEvent("ievupdateproperty", "ObTheme", iobNewValue);
		}
	},
	updateArActions: function(iarNewValue, iarOldValue) {
		var me = this;
		//Si está inicializado
		if (me.initialized) {
			//Se traspasa esta propiedad a la galaxia inicial
			me.fireEvent("ievupdateproperty", "ArActions", iarNewValue);
		}
	},
	updateDefaultChildConfig: function(iobNewValue, iobOldValue) {
		var me = this;
		//Si está inicializado
		if (me.initialized) {
			//Se traspasa esta propiedad a la galaxia inicial
			me.fireEvent("ievupdateproperty", "DefaultChildConfig", iobNewValue);
		}
	},
	/**
	 * @method fobTitle
	 * Retorna la referencia al elemento título del componente
	 * @return {Object} Elemento título
	 * @private
	 */
	fobTitle: function() {
		//Retorna el DOM del elemento título, lo cachea
		var me = this;
		if (!me.cacheTitle) {
			me.cacheTitle = me.element.down('.o-galaxy-title');
		}
		return me.cacheTitle;
	},
	/**
	 * @method fobCanvas
	 * Retorna el elemento DOM del elemento canvas
	 * @return {Object}      Elemento donde ver el componente
	 * @private
	 */
	fobCanvas: function() {
		//Retorna el DOM del elemento título, lo cachea
		var me = this;
		if (!me.cacheCanvas) {
			me.cacheCanvas = me.element.down('.o-galaxy-stage');
		}
		return me.cacheCanvas;
	},
	/**
	 * @method fobConvention
	 * Retorna el DOM del elemento donde ver las convenciones
	 * @return {Object}      Elemento donde ver las convenciones
	 * @private
	 */
	fobConvention: function() {
		//Retorna el DOM del elemento convenciones, lo cachea
		var me = this;
		if (!me.cacheTitle) {
			me.cacheTitle = me.element.down('.o-galaxy-convention');
		}
		return me.cacheTitle;
	},

	buildConventions: function() {
		//Se obtiene las convenciones de Solido y de Punteado
		//Si almenos hay una, se adiciona la clase 'has-conventions' al componente
		//Sino, se remueve la clase 'has-conventions'
		//
		//Se construye el html que detalla las convenciones
		//Se escucha el evento tap sobre el botón que muestra las convenciones (toggleConventions)
	},

	toggleConventions: function() {
		//Adiciona u remueve la clase 'conventions-showed' al componente
	}
});