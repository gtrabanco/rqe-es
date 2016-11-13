import {options} from "../../config/index";
var Coder = require('base-encode');


var enc = new Coder(options.alphabet);

export = enc;