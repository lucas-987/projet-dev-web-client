var itemCats = [ 'helmet', 'crown', 'armor', 'clothes', 'weapon', 'lighter', 'purse', 'potion', 'spell', 'food'];

var itemLimits = [
	{
		'slot': 'head',
		'limit': 1,
		'types': ['helmet', 'crown']
	},
	{
		'slot': 'body',
		'limit': 1,
		'types': ['armor', 'clothes']
	},
	{
		'slot': 'hands',
		'limit': 2,
		'types': ['weapon', 'lighter']
	},
	{
		'slot': 'belt',
		'limit': 3,
		'types': ['weapon', 'purse']
	},
	{
		'slot': 'bag',
		'limit': 10,
		'types': ['helmet', 'crown', 'clothes', 'lighter', 'potion', 'spell', 'food', 'purse']
	}
];

class Item {
	constructor(id, name, type, price, effect) {
		this.id = id;
		this.name = name;

		if(itemCats.includes(type)) {
			this.type = type;
		}
		else {
			this.type = '';
		}
		
		this.price = price;
		this.effect = effect;
	}
}

var items = [
	new Item(0, 'conic helmet', 'helmet', 200, 'A+10'),
	new Item(1, 'great crown of apologia', 'crown', 200, 'A+20'),
	new Item(2, 'band of joy', 'crown', 100, 'L+10'),
	new Item(3, 'leather armor', 'armor', 100, 'A+10'),
	new Item(4, 'broigne', 'armor', 200, 'A+20'),
	new Item(5, 'hauberk', 'armor', 500, 'A+40'),
	new Item(6, 'plate armor', 'armor', 1000, 'A+60'),
	new Item(7, 'tuxedo', 'clothes', 600, 'L+1'),
	new Item(8, 'cursed swimsuit', 'clothes', 10, 'A-10'),
	new Item(9, 'unicorn cosplay', 'clothes', 200, 'L+10'),
	new Item(10, 'dagger', 'weapon', 100, 'S+5'),
	new Item(11, 'cursed dagger', 'weapon', 100, 'S-5'),
	new Item(12, 'short sword', 'weapon', 200, 'S+10'),
	new Item(13, 'cursed short sword', 'weapon', 200, 'S-10'),
	new Item(14, 'long sword', 'weapon', 300, 'S+20'),
	new Item(15, 'cursed long sword', 'weapon', 300, 'S-20'),
	new Item(16, 'axe', 'weapon', 100, 'S+10'),
	new Item(17, 'cursed axe', 'weapon', 100, 'S-10'),
	new Item(18, 'great axe', 'weapon', 200, 'S+20'),
	new Item(19, 'cursed great axe', 'weapon', 200, 'S-20'),
	new Item(20, 'torch', 'lighter', 2, ''),
	new Item(21, 'oil lamp', 'lighter', 10, ''),
	new Item(22, 'leather purse', 'purse', 10, ''),
	new Item(23, 'protection potion', 'potion', 100, 'a+10'),
	new Item(24, 'health potion', 'potion', 100, 'l+10'),
	new Item(25, 'strength potion', 'potion', 100, 's+10'),
	new Item(26, 'fireball', 'spell', 1000, ''),
	new Item(27, 'ice cone', 'spell', 1000, ''),
	new Item(28, 'total healing', 'spell', 1000, ''),
	new Item(29, 'invisibility', 'spell', 1000, ''),
	new Item(30, 'levitation', 'spell', 1000, ''),
	new Item(31, 'apple', 'food', 1, 'l+1'),
	new Item(32, 'chicken', 'food', 10, 'l+5'),
	new Item(33, 'beef', 'food', 15, 'l+10'),
	new Item(34, 'wine', 'food', 2, 'l+2')
];

class Perso {

	constructor(name, level) {
		this.name = name;
		this.level = level;
		this.slots = [
			{name:'head', id:1, items:[]},
			{name:'body', id:2, items:[]},
			{name:'hands', id:3, items:[]},
			{name:'belt', id:4, items:[]},
			{name:'bag', id:5, items:[]}
		];
		this.boughtItems = []; // list of item bought but not yet assigned

		this.life = this.level*50;
		this.strength = this.level*20;
		this.gold=500;
	}

	buy(item) {
		if(parseInt(this.gold) >= parseInt(item.price)) {
			this.boughtItems.push(item);
			this.gold -= item.price;
		}
	}
}

var players = [
	new Perso("Lucas", 451),
	new Perso("Sacul", 1),
	new Perso("Lacus", 3),
	new Perso("Sucal", 6),
	new Perso("Lacas", 1),
	new Perso("Culas", 31),
	new Perso("Calas", 9),
	new Perso("Ulsac", 3),
	new Perso("Aculs", 27),
	new Perso("Alsuc", 12),
	new Perso("Salac", 8)
];

players[0].gold = 1000000;

for(let player of players) {
	player.slots[0].items.push(items[26], items[34]);
	player.slots[1].items.push(items[0]);
	player.slots[2].items.push(items[3]);
	player.slots[4].items.push(items[3]);
}

var nbMaxItems = 10;
var nbMaxPlayers = 15;

export {players, items, itemCats, itemLimits, nbMaxItems, nbMaxPlayers, Perso, Item}