// Copyright 2012 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// This directive is always editable.

oppia.directive('musicPhraseEditor', function($compile, warningsData) {
  return {
    link: function(scope, element, attrs) {
      scope.getTemplateUrl = function() {
        return OBJECT_EDITOR_TEMPLATES_URL + scope.$parent.objType;
      };
      $compile(element.contents())(scope);
    },
    restrict: 'E',
    scope: true,
    template: '<div ng-include="getTemplateUrl()"></div>',
    controller: ['$scope', '$rootScope', function($scope, $rootScope) {
      $scope.maxNotesOnStaff = 8;

      $scope.schema = {
        type: 'list',
        items: {
          type: 'unicode',
          choices: [
            'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5',
            'G5', 'A5'
          ]
        },
        ui_config: {
          add_element_text: 'Add Note'
        }
      };

      // Reset the component each time the value changes (e.g. if this is part
      // of an editable list).
      $scope.$watch('$parent.value', function(newValue, oldValue) {
        // TODO(sll): Check that $scope.$parent.value is a list.
        $scope.localValue = [];
        if (newValue) {
          for (var i = 0; i < newValue.length; i++) {
            $scope.localValue.push(newValue[i].readableNoteName);
          }
        }
      }, true);

      $scope.$watch('localValue', function(newValue, oldValue) {
        if (newValue && oldValue) {
          var parentValues = [];
          for (var i = 0; i < newValue.length && i < $scope.maxNotesOnStaff; i++) {
            parentValues.push({
              readableNoteName: newValue[i],
              noteDuration: {'num': 1, 'den': 1}
            });
          }
          $scope.$parent.value = parentValues;
        }
      }, true);
    }]
  };
});
