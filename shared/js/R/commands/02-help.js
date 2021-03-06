/*
  Copyright 2010 Jamie Love. All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are
  permitted provided that the following conditions are met:

     1. Redistributions of source code must retain the above copyright notice, this list of
        conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright notice, this list
        of conditions and the following disclaimer in the documentation and/or other materials
        provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY JAMIE LOVE ``AS IS'' AND ANY EXPRESS OR IMPLIED
  WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
  FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JAMIE LOVE OR
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
  ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

  The views and conclusions contained in the software and documentation are those of the
  authors and should not be interpreted as representing official policies, either expressed
  or implied, of Jamie Love.
*/

rnode.command.Help = RNodeCore.extend (rnode.command.CommandHandler, {
    canHandle: function (parsedCommand) {
        return parsedCommand.ast.id == '?' ||
            (parsedCommand.isFunction() && parsedCommand.getFunctionName().search(/^\s*help\.?/) == 0);
    },

    execute: function (rApi, parsedCommand, userCallback, consolePrint) {
        var uri;
        if (parsedCommand.ast.id == '?' && parsedCommand.ast.first.id == '?') { // THe search command is split into two ? ? by the parser
            uri = '/help/doc/html/Search?name=' + encodeURIComponent (parsedCommand.get().substring(2)) + '&title=1&keyword=1&alias=1'; // R 2.10 provides a web interface for ?? searching
        } else if (parsedCommand.ast.id == '?') {
            uri = '/help/?search=' + encodeURIComponent (parsedCommand.get().substring(1));
        } else if (parsedCommand.getFunctionName() == 'help.start') {
            uri = '/help/base/html/00Index.html';
        } else {
            uri = '/help/?search=' + encodeURIComponent (parsedCommand.extractParameter ('help', 0).get());
        }

        window.open (uri, 'rnode-help', 'status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=1,scrollbars=1,height=600,width=700');
        userCallback(true, {
            command: parsedCommand,
            message: 'ok',
            response: new rnode.R.RObject([''], parsedCommand)
        });
    }
});

rnode.command.CommandHandler.register (rnode.command.Help);


