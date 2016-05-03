Ext.define('OUIsp.Galaxies.Util', {
	alternateClassName: 'Galaxies_Util',

	singleton: true,
	cobTHEME: {
		GRAY: {
			labelColor: "gray",
			borderColor: "gray",
			fillColor: "#FFFFFF",
			moonColor: ""
		},
		FUCHSIA: {
			labelColor: "red",
			borderColor: "red",
			fillColor: "red",
			moonColor: "red"
		},
		BLUE: {
			labelColor: "#157EFB",
			borderColor: "#157EFB",
			fillColor: "#FFFFFF",
			moonColor: "#71B0FB"
		},
		GREEN: {
			labelColor: "green",
			borderColor: "green",
			fillColor: "green",
			moonColor: "green"
		}
	},

	cobICON: {
		PLUS: 'plus',
		MINUS: 'minus',
		EXCLUDE: 'exclude'
	},

	cobLINE: {
		DOTTED: 'dotted',
		SOLID: 'solid'
	},

	cobZOOM: {
		BIGGEST: 16,
		EXPANDED: 8,
		GALAXY: 4,
		PLANET: 2,
		SATELLITE: 1,
		HIDDEN: 0
	},

	fobDefaultStyle: function() {
		return this.cobGRAY_THEME;
	},
	fobDefaultLine: function() {
		return this.csbSOLID_LINE;
	},
	fblValidStyle: function(iobStyle) {
		var me = this;
		return iobStyle === me.cobGRAY_COLOR ||
			iobStyle === me.cobFUCHSIA_THEME ||
			iobStyle === me.cobBLUE_THEME ||
			iobStyle === me.cobGREEN_THEME;
	},
	fblValidIcon: function(isbIconCfg) {
		var me = this;
		return isbIconCfg === me.csbPLUS_ICON ||
			isbIconCfg === me.csbMINUS_ICON ||
			isbIconCfg === me.csbEXCLUDE_ICON;
	},
	fblValidLineType: function(isbLineType) {
		var me = this;
		return isbLineType === me.csbDOTTED_LINE ||
			isbLineType === me.csbSOLID_LINE;
	}
});