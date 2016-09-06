requirejs.config({
    shim: {
        tests: {
            deps: ['wuzhui']
        },
        wuzhui: {
            deps: ['jquery']
        }
    },
    paths: {
        chitu: 'scripts/chitu',
        hammer: 'scripts/hammer',
        iscroll: 'iscroll-probe',
        jquery: 'scripts/jquery-2.1.4',
        move: 'scripts/move',
        text: 'scripts/text',
        wuzhui: 'scripts/wuzhui'
    }
});
requirejs(['tests']);