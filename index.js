const io = require('socket.io-client')('http://192.168.25.121:8080')

var blessed = require('blessed'),
screen = blessed.screen({
  debug: true
});


var tst = null
io.on('msgAnterios', function (res) {
  console.log('RESPONSE FROM SERVR', res);
  tst = res
})


var form = blessed.form({
  parent: screen,
  keys: true,
  left: 'center',
  top: 'center',
  width: '100%',
  height: '100%',
  bg: 'black:q',
  autoNext: true,
  content: 'Add Alert'
});

var textAreaMessager = blessed.Textbox({
  parent: form,
  top: '90%',
  height: 2,
  left: 2,
  right: 2,
  bg: 'blue',
  width: '95%',
  keys: true,
  inputOnFocus: true,
  content: 'test2',
});

var greaterThanEdit = blessed.textarea({
  parent: form,
  top: 2,
  height: 2,
  left: 2,
  right: 2,
  bg: 'black',
  width: '90%',
  height: '85%',
  keys: true,
  inputOnFocus: true,
  content: 'test',
});

var submit = blessed.button({
  parent: form,
  mouse: true,
  keys: true,
  left: 'center',
  shrink: true,
  top:'97%',
  width: '10%',
  height: '8%',
  // padding: {
    //     left: 1,
    //     right: 1
    // },
    // left: 10,
    // bottom: 30,
    name: 'submit',
    content: 'submit',
    style: {
      bg: 'blue',
      focus: {
        bg: 'red'
      },
      hover: {
        bg: 'red'
      }
    }
  });

  // var cancel = blessed.button({
    //     parent: form,
    //     mouse: true,
    //     keys: true,
    //     shrink: true,
    //     padding: {
      //         left: 1,
      //         right: 1
      //     },
      //     left: 20,
      //     bottom: 2,
      //     name: 'cancel',
      //     content: 'cancel',
      //     style: {
        //         bg: 'blue',
        //         focus: {
          //             bg: 'red'
          //         },
          //         hover: {
            //             bg: 'red'
            //         }
            //     }
            // });
            getText = () => {
              greaterThanEdit.value
            }

            submit.on('press', function() {
              io.emit('sendMsg', {
                author: textAreaMessager.getText(),
                password: null,
              });
              form.reset();
            });

            // cancel.on('press', function() {
              //     form.reset();
              // });

              // form.on('submit', function(data) {
                //     form.setContent('Submitted.');
                //     screen.render();
                // });

                form.on('reset', function(data) {
                  form.setContent('Canceled.');
                  screen.render();
                });

                screen.key('q', function() {
                  process.exit(0);
                });

                screen.key('enter', function() {
                  greaterThanEdit.setText(textAreaMessager.getText());
                });

                textAreaMessager.focus();


                screen.render();
