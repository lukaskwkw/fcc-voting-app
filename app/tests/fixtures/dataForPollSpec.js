var someChoices1 = [{
		text: 'Canon',
		votes: [{userId: '1234521223'}, {userId: '1234521223'}, {userId: '1234521223'}]
	}, {
		text: 'Nikon',
		votes: [{userId: '34523424'}, {userId: '89898989'}]
	}, {
		text: 'Sony',
		votes: [{userId: '8989980898'}]
	}

]

var data1 = {
	category: 'Tech',
	question: 'What is your favorite digital camera brand?',
	choices: someChoices1

}

var someChoices2 = [{
		text: 'Cappuccino',
		votes: [{userId: '1234521223'}, {userId: '1234521223'}, {userId: '1234521223'}]
	}, {
		text: 'Instant coffe',
		votes: [{userId: '34523424'}, {userId: '89898989'}]
	}, {
		text: 'Espresso',
		votes: [{userId: '8989980898'}, {userId: '8989089976'}, {userId: '1234521223'}]
	}

]

var data2 = {
	category: 'Live',
	question: 'What\'s your favorite coffee drink?',
	choices: someChoices2

}


var someChoices3 = [{
		text: 'Yes, a weekly poll',
		votes: [{userId: '1234521223'}, {userId: '1234521223'}, {userId: '1234521223'}]
	}, {
		text: 'Yes, a daily poll',
		votes: [{userId: '34523424'}, {userId: '89898989'}]
	}, {
		text: 'Yes, periodically',
		votes: [{userId: '8989980898'}, {userId: '8989089976'}, {userId: '1234521223'}]
	}

]

var data3 = {
	category: 'Web',
	question: 'Do you run polls on your sites sidebar?',
	choices: someChoices3

}

module.exports = {
	data1,
	data2,
	data3
};
