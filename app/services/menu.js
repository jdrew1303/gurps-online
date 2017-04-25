/**
 * Created by lelabo on 19/04/17.
 */
angular.module('gurps-online').factory('MenuService', function ($location) {

    // var sections = [{
    //     name: 'Getting Started',
    //     state: 'home',
    //     type: 'link'
    // }];
    var sections = [];


    sections.push({
        name: 'Characters',
        type: 'toggle',
        pages: [{
            name: 'Menu',
            type: 'link',
            state: 'app.characters.menu',
            icon: 'fa fa-group'
        }
        ]
    });

    var self = {
        sections: sections,
        currentTitle: null,
        toggleSelectSection: function (section) {
            self.openedSection = (self.openedSection === section ? null : section);
        },
        isSectionSelected: function (section) {
            return self.openedSection === section;
        }
    };
    return self;
});