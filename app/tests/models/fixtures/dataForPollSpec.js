var someChoices1 = [{
		text: 'Yes it is',
		votes: [{userId: '1234521223'}, {userId: '1234521223'}, {userId: '1234521223'}]
	}, {
		text: 'No its not',
		votes: [{userId: '34523424'}, {userId: '345667767'}, {userId: '89898989'}]
	}, {
		text: 'It\'s depends',
		votes: [{userId: '8989980898'}, {userId: '8989089976'}, {userId: '1234521223'}]
	}

]

var data1 = {
	category: 'Nature',
	question: 'Is LSD a nature drag?',
	choices: someChoices1

}

var someChoices2 = [{
		text: 'test answer1',
		votes: [{userId: '1234521223'}, {userId: '1234521223'}, {userId: '1234521223'}]
	}, {
		text: 'answer2',
		votes: [{userId: '34523424'}, {userId: '345667767'}, {userId: '89898989'}]
	}, {
		text: 'Next one',
		votes: [{userId: '8989980898'}, {userId: '8989089976'}, {userId: '1234521223'}]
	}

]

var data2 = {
	category: 'Health',
	question: 'Test question lorem ipsum',
	choices: someChoices2

}

module.exports = {
	data1,
	data2
};
