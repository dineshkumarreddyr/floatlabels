/*
* Angular directive for float label
* Created by Dinesh Rachumalla
* Created date 23-12-2016
* Please do not modify the code
*/
(function(){
	"use strict";

	angular
	.module('FloatingLabel')
	.directive('floatLabel',floatlabelDirective);

	function floatlabelDirective(){
		return{
			restrict:'A',
			scope:{
				floatType:'@'
			},
			require:'ngModel',
			link:function($scope,$el,$attr,$ctrl){

				//Adding the base css class for parent element
				$el.parent().addClass('float-label');
				$scope.validationExists = $attr.validationLabel;
				//For float type sticky
				//On focus of element the label should be float
				$el.bind('focus',setFocusEvent);
				if($scope.floatType=="basic"){
					$scope.placeholderValue = $attr.placeholder;
				}
				else if($scope.floatType=="custom"){
					$scope.placeholderValue = $attr.customLabel;
				}

				//Static label text
				var lblTemplate = "<label class='placeholder left'>"+$scope.placeholderValue+"</label>";

				$el.parent().prepend(lblTemplate);

				$el.bind('blur',setBlurEvent);
				$el.bind('keyup',setKeyUpEvent);

				//Focus Event
				function setFocusEvent(e){
					angular.element(this.previousElementSibling).addClass('active');
				}
				//Blur Event
				function setBlurEvent(e){
					if(this.value===undefined || this.value==''){
						angular.element(this.previousElementSibling).removeClass('active');
						if($scope.validationExists){
							angular.element(this.previousElementSibling).addClass('required').addClass('active');
						}
					}
				}
				//Keyup Event
				function setKeyUpEvent(e){
					if(this.value && this.value!==""){
						angular.element(this.previousElementSibling).removeClass('required');
					}
					else{
						if($scope.validationExists){
							angular.element(this.previousElementSibling).addClass('required');
						}
					}
				}

				//Postion Properties
				if($attr.placeholderPositionRight){
					angular.element($el[0].previousElementSibling).removeClass('left').addClass('right');
				}
			}
		}
	}
})();