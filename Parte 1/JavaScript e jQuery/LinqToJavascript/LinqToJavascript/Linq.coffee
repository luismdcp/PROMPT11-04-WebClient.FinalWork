class Linq
	constructor: (@someArray) ->

	@from: (dataArray) ->
		new Linq(dataArray)

	where: (predicateFunction) ->
		newArray = []
		for element in @someArray
			newArray[newArray.length] = element if predicateFunction.call(element)
		return new Linq(newArray)
			
	orderBy: (columnSelectorFunction) ->
		newArray = []
		for element in @someArray
			newArray[newArray.length] = element
		sortFunction = (a,b) ->
			resultA = columnSelectorFunction.call(a)
			resultB = columnSelectorFunction.call(b)
			resultA - resultB
		new Linq(newArray.sort(sortFunction))

	select: (arg1, otherArgs...) ->
		if typeof arg1 is 'function'
			newArray = []
			for element in @someArray
				newArray[newArray.length] = arg1.call(element)
			new Linq(newArray)
		else
			argsSet = [arg1].concat(otherArgs)
			projectionResult = []
			projectionObject = {}
			for element in @someArray
				for arg in argsSet
					projectionObject[arg] = element[arg]
				projectionResult.push(projectionObject)
				projectionObject = {}
			new Linq(projectionResult)

	any: (predicateFunction) ->
		for element in @someArray
			return true if predicateFunction.call(element)
		return false

	all: (predicateFunction) ->
		for element in @someArray
			return false if !predicateFunction.call(element)
		return true

	count: () ->
		return @someArray.length

	foreach: (actionFunction) ->
		for element in @someArray
			actionFunction.call(element)
		new Linq(@someArray)

### Linq tests ###

students =
	[
		{ number: 8, name: "Chris", grade: 10 },
		{ number: 2, name: "Kate", grade: 14 },
		{ number: 3, name: "Josh", grade: 13 },
		{ number: 6, name: "John", grade: 16 },
		{ number: 5, name: "Steve", grade: 9 },
		{ number: 4, name: "Katie", grade: 12 },
		{ number: 7, name: "Dirk", grade: 19 },
		{ number: 1, name: "Chris", grade: 8 },
		{ number: 9, name: "Bernard", grade: 18 },
		{ number: 10, name: "Melissa", grade: 7 }
	]

studentsLinqSet = Linq.from(students)
approvedStudentNames = studentsLinqSet
                           .where(() -> return this.grade > 10)
                           .orderBy(() -> return this.number)
                           .select(() -> return this.name)


projection = studentsLinqSet.select("number", "grade")
gradeBonus = studentsLinqSet.foreach(() -> this.grade = this.grade + 1)
