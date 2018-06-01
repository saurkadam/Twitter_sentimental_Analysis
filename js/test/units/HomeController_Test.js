

describe('Testing angularjs test suite', function(){
	beforeEach(module('app'));
	describe('testing controller', function(){
		var scope,ctrl,rootscope;
		beforeEach(inject(function($controller,$rootScope){
				scope=$rootScope.$new();
				rootscope=$rootScope;
				ctrl =  $controller('LoginController', {$scope:scope});

			}));

		it('trySampleRequest function',function(){
			expect(scope.pgNum).toBeDefined();
			expect(scope.pgNum).toBe(0);
			expect(scope.neutral).toBeDefined();
			expect(scope.neutral).toBeFalsy();
			expect(scope.bad).toBeDefined();
			expect(scope.bad).toBeFalsy();
			expect(scope.good).toBeDefined();
			expect(scope.good).toBeFalsy();
			expect(scope.currentpage).toBeDefined();
			expect(scope.currentpage).toBeFalsy();
			expect(scope.totalpage).toBeDefined();
			expect(scope.totalpage).toBeFalsy();
			expect(scope.pgNum).toBeDefined();
			expect(scope.pgNum).toBeFalsy();
			expect(scope.counter).toBeDefined();
			expect(scope.counter).toBeFalsy();
		});

		it('Signout', function(){
			$scope.Signout();
			expect($location.path()).toBe('/');
		});
		it('searchText', function(){

			expect(scope.data).toBeDefined();
			expect(scope.fakeData).toBeDefined();
			expect(scope.topic).toBeDefined();

			$scope.searchText();
			expect(scope.data).not.toBeNull();
			expect(scope.fakeData).toBeNull();
			expect(scope.topic).toBeNull();


		});


	});
});