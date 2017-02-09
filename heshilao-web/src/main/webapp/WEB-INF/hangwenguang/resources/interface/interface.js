define('interface/interface', [], function (DependParam) {

	var interfaceData = [
		{
			real: '/apiop/merchant/search_merchant',
			mock: '/searchMerchant.json',
			author: 'panger',
			name: '搜索商户',
			module: 'common',
			description: ''
		}

	];

	interfaceData.forEach(function(itemData){
		itemData.mock = 'shihui/interface' + itemData.mock;
	});

	return {
		getAllInterfaceData: function(url){
			return interfaceData;
		},		
		getInterfaceData: function(url){
			var currInterfaceData = null;

			interfaceData.forEach(function(itemData){
				if(itemData.real === url){
					currInterfaceData = itemData;
				}
			});

			if(!currInterfaceData){
				console.error('接口不存在:' + url);
			}

			return currInterfaceData;
		},
		getMockInterface: function(url){
			var currInterfaceData = this.getInterfaceData(url);
			if(currInterfaceData){
				return currInterfaceData.mock;
			}else{
				return '';
			}
		},

	}
} );
