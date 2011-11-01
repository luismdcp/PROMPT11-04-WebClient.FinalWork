(function() {
  var Linq, approvedStudentNames, gradeBonus, projection, students, studentsLinqSet;
  var __slice = Array.prototype.slice;
  Linq = (function() {
    function Linq(someArray) {
      this.someArray = someArray;
    }
    Linq.from = function(dataArray) {
      return new Linq(dataArray);
    };
    Linq.prototype.where = function(predicateFunction) {
      var element, newArray, _i, _len, _ref;
      newArray = [];
      _ref = this.someArray;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        if (predicateFunction.call(element)) {
          newArray[newArray.length] = element;
        }
      }
      return new Linq(newArray);
    };
    Linq.prototype.orderBy = function(columnSelectorFunction) {
      var element, newArray, sortFunction, _i, _len, _ref;
      newArray = [];
      _ref = this.someArray;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        newArray[newArray.length] = element;
      }
      sortFunction = function(a, b) {
        var resultA, resultB;
        resultA = columnSelectorFunction.call(a);
        resultB = columnSelectorFunction.call(b);
        return resultA - resultB;
      };
      return new Linq(newArray.sort(sortFunction));
    };
    Linq.prototype.select = function() {
      var arg, arg1, argsSet, element, newArray, otherArgs, projectionObject, projectionResult, _i, _j, _k, _len, _len2, _len3, _ref, _ref2;
      arg1 = arguments[0], otherArgs = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (typeof arg1 === 'function') {
        newArray = [];
        _ref = this.someArray;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          newArray[newArray.length] = arg1.call(element);
        }
        return new Linq(newArray);
      } else {
        argsSet = [arg1].concat(otherArgs);
        projectionResult = [];
        projectionObject = {};
        _ref2 = this.someArray;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          element = _ref2[_j];
          for (_k = 0, _len3 = argsSet.length; _k < _len3; _k++) {
            arg = argsSet[_k];
            projectionObject[arg] = element[arg];
          }
          projectionResult.push(projectionObject);
          projectionObject = {};
        }
        return new Linq(projectionResult);
      }
    };
    Linq.prototype.any = function(predicateFunction) {
      var element, _i, _len, _ref;
      _ref = this.someArray;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        if (predicateFunction.call(element)) {
          return true;
        }
      }
      return false;
    };
    Linq.prototype.all = function(predicateFunction) {
      var element, _i, _len, _ref;
      _ref = this.someArray;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        if (!predicateFunction.call(element)) {
          return false;
        }
      }
      return true;
    };
    Linq.prototype.count = function() {
      return this.someArray.length;
    };
    Linq.prototype.foreach = function(actionFunction) {
      var element, _i, _len, _ref;
      _ref = this.someArray;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        actionFunction.call(element);
      }
      return new Linq(this.someArray);
    };
    return Linq;
  })();
  /* Linq tests */
  students = [
    {
      number: 8,
      name: "Chris",
      grade: 10
    }, {
      number: 2,
      name: "Kate",
      grade: 14
    }, {
      number: 3,
      name: "Josh",
      grade: 13
    }, {
      number: 6,
      name: "John",
      grade: 16
    }, {
      number: 5,
      name: "Steve",
      grade: 9
    }, {
      number: 4,
      name: "Katie",
      grade: 12
    }, {
      number: 7,
      name: "Dirk",
      grade: 19
    }, {
      number: 1,
      name: "Chris",
      grade: 8
    }, {
      number: 9,
      name: "Bernard",
      grade: 18
    }, {
      number: 10,
      name: "Melissa",
      grade: 7
    }
  ];
  studentsLinqSet = Linq.from(students);
  approvedStudentNames = studentsLinqSet.where(function() {
    return this.grade > 10;
  }).orderBy(function() {
    return this.number;
  }).select(function() {
    return this.name;
  });
  projection = studentsLinqSet.select("number", "grade");
  gradeBonus = studentsLinqSet.foreach(function() {
    return this.grade = this.grade + 1;
  });
}).call(this);
