describe("Game", function() {
  var player1,
      player2,
      game;

  beforeEach(function() {
    player1 = new Player();
    player2 = new Player();
    game = new Game(player1, player2);
  });

  describe("#start", function() {
    describe("in general", function() {
      beforeEach(function() {
        game.start();
      });

      it("marks game as started", function() {
        expect(game.isStarted).toBeTruthy();
      });

      it("sets 2 checkers on player1 24-point", function() {
        var point = game.getPoint(24);
        expect(point.checkersCount()).toBe(2);
      });

      it("sets 5 checkers on player1 13-point", function() {
        var point = game.getPoint(13);
        expect(point.checkersCount()).toBe(5);
      });

      it("sets 3 checkers on player1 8-point", function() {
        var point = game.getPoint(8);
        expect(point.checkersCount()).toBe(3);
      });

      it("sets 5 checkers on player1 6-point", function() {
        var point = game.getPoint(6);
        expect(point.checkersCount()).toBe(5);
      });

      it("sets 2 checkers on player2 1-point", function() {
        var point = game.getPoint(1);
        expect(point.checkersCount()).toBe(2);
      });

      it("sets 5 checkers on player2 12-point", function() {
        var point = game.getPoint(12);
        expect(point.checkersCount()).toBe(5);
      });

      it("sets 3 checkers on player2 17-point", function() {
        var point = game.getPoint(17);
        expect(point.checkersCount()).toBe(3);
      });

      it("sets 5 checkers on player2 19-point", function() {
        var point = game.getPoint(19);
        expect(point.checkersCount()).toBe(5);
      });

      it("rolls dice", function() {
        var result = game.diceRoller;
        expect(result.firstValue).not.toBeNull();
      });
    });

    describe("when first player wins dice roll", function() {
      var diceRoller;

      beforeEach(function() {
        diceRoller = new DiceRoller();
        diceRoller.rollUntilNotPair = function() {};
        diceRoller.firstValue = 5;
        diceRoller.secondValue = 3;

        game.diceRoller = diceRoller;
        game.start();
      });

      it("marks first player as current", function() {
        expect(game.currentPlayer).toBe(player1);
      });
    });

    describe("when second player wins dice roll", function() {
      var diceRoller;

      beforeEach(function() {
        diceRoller = new DiceRoller();
        diceRoller.rollUntilNotPair = function() {};
        diceRoller.firstValue = 3;
        diceRoller.secondValue = 5;

        game.diceRoller = diceRoller;
        game.start();
      });

      it("marks second player as current", function() {
        expect(game.currentPlayer).toBe(player2);
      });
    });
  });

  describe("#canMove", function() {
    var diceRoller;

    beforeEach(function() {
      diceRoller = new DiceRoller();
      diceRoller.hasValue = function(value) { return true };

      game.markStarted();
      game.setCurrenyPlayer(player1);
      game.putCheckers(2, player1, 8);
      game.putCheckers(2, player1, 6);
      game.diceRoller = diceRoller;
    });

    it("returns true when move is possible", function() {
      expect(game.canMove(8, 6)).toBe(true);
    });

    it("return false when source position does not have a checker", function() {
      expect(game.canMove(9, 7)).toBe(false);
    });

    it("returns false when dice values are different", function() {
      diceRoller.hasValue = function(value) { return false };
      expect(game.canMove(8, 5)).toBe(false);
    });

    it("returns true when target position has only one opponent checker", function() {
      game.putCheckers(1, player2, 5);
      expect(game.canMove(8, 5)).toBe(true);
    });

    it("returns false when target position has more than one opponent checkers", function() {
      game.putCheckers(2, player2, 5);
      expect(game.canMove(8, 5)).toBe(false);
    });
  });
});
