/* ========================================================================
 * Copyright 2014 macrosoft
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 macrosoft

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * ========================================================================


Source generated by CrudMaker version 1.0.0.201408112050

*/
define(['model/_cursoModel'], function() {
    App.Model.CursoModel = App.Model._CursoModel.extend({

 	validate: function(attrs,options){
            var validationMessage = "";
            if(!attrs.name){
                validationMessage = "The name can't be empty.";
            }
            if(!attrs.programa)
            {
                validationMessage = "El curso debe tener un programa asociado";
            }
            if(attrs.programa.length!==4)
            {
                validationMessage = " El programa debe tener 4 caracteres!!! ";
            }
            if(attrs.programa[0] === attrs.programa[0].toUpperCase()&&attrs.programa[1] === attrs.programa[1].toUpperCase()&&attrs.programa[2] === attrs.programa[2].toUpperCase()&&attrs.programa[3] === attrs.programa[3].toUpperCase())
            {
                validationMessage = " El programa debe estar compuesto de letras may�sculas!!!! ";
            }
            if(validationMessage.length>0){
               return validationMessage;
            }
        }

    });

    App.Model.CursoList = App.Model._CursoList.extend({
        model: App.Model.CursoModel
    });

    return  App.Model.CursoModel;

});