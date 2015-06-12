'use strict';

/**
 * @ngdoc service
 * @name dsrssApp.validate
 * @description
 * # validate
 * Service in the dsrssApp.
 */
angular.module('dsrssApp')
  .service('Validate', function Validate() {
    return {
        'message': {
            'minlength': 'This value is not long enough.',
            'maxlength': 'This value is too long.',
            'email': 'A properly formatted email address is required.',
            'required': 'This field is required.'
        },
        'moreMessages': {
            'demo': {
                'required': 'Here is a sample alternative required message.'
            }
        },
        'checkMoreMessages': function(name,error){
            return (this.moreMessages[name] || [])[error] || null;
        },
        validationMessages: function(field,form,errorBin){
            var messages = [];
            for(var e in form[field].$error){
                if(form[field].$error[e]){
                    var specialMessage = this.checkMoreMessages(field,e);
                    if(specialMessage){
                        messages.push(specialMessage);
                    }else if(this.message[e]){
                        messages.push(this.message[e]);
                    }else{
                        messages.push('Error: ' + e);
                    }
                }
            }
            var dedupedMessages = [];
            angular.forEach(messages, function(el){
                if(dedupedMessages.indexOf(el) === -1){
                	dedupedMessages.push(el);
                }
            });
            if(errorBin){
                errorBin[field] = dedupedMessages;
            }
        },
        'form_validation': function(form,errorBin){
            for(var field in form){
                if(field.substr(0,1) !=='$'){
                    this.validationMessages(field,form,errorBin);
                }
            }
        }
    };
});
