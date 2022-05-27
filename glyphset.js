const glyphset = Vue.createApp({});

class Glyph {
    constructor(name) {
        this.name = name;
    }
}

glyphset.component('glyphset-preview', {
    props: ['webfont', 'cssfullname'],
    delimiters: ['[[', ']]'],
    data: function() {
        return {
            isLoading: false,
            isError: false,
            errorInfo: undefined,
            f: undefined,
            currentSelection: undefined,
            fontSize: 100,
            baselineOffset: 0,
            capHeightOffset: 0,
            groups: {
                "Uppercase": ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
                "Small Caps": ["a.sc","b.sc","c.sc","d.sc","e.sc","f.sc","g.sc","h.sc","i.sc","j.sc","k.sc","l.sc","m.sc","n.sc","o.sc","p.sc","q.sc","r.sc","s.sc","t.sc","u.sc","v.sc","w.sc","x.sc","y.sc","z.sc"],
                "Lowercase": ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
                "Uppercase Extended": ["Aacute", "Abreve", "uni01CD", "Acircumflex", "Adieresis", "Agrave", "Amacron", "Aogonek", "Aring", "Atilde", "AE", "AEacute", "Cacute", "Ccaron", "Ccedilla", "Cdotaccent", "Eth", "Dcaron", "Dcroat", "Eacute", "Ecaron", "Ecircumflex", "Edieresis", "Edotaccent", "Egrave", "Emacron", "Eogonek", "uni1EBC", "Gbreve", "uni0122", "Gdotaccent", "Hbar", "IJ", "Iacute", "uni01CF", "Icircumflex", "Idieresis", "Idotaccent", "Igrave", "Imacron", "Iogonek", "Itilde", "uni00A40301", "uni004A0301", "uni0136", "Lacute", "Lcaron", "uni013B", "Lslash", "Nacute", "Ncaron", "uni0145", "Eng", "Ntilde", "Oacute", "uni01D1", "Ocircumflex", "Odieresis", "Ograve", "Ohungarumlaut", "Omacron", "Oslash", "Oslashacute", "Otilde", "OE", "Thorn", "Racute", "Rcaron", "uni0156", "Sacute", "Scaron", "Scedilla", "uni0218", "uni1E9E", "Tbar", "Tcaron", "uni0162", "uni021A", "Uacute", "uni01D3", "Ucircumflex", "Udieresis", "Ubreve", "uni01D7", "uni01D9", "uni01DB", "uni01D5", "Ugrave", "Uhungarumlaut", "Umacron", "Uogonek", "Uring", "Utilde", "Wacute", "Wcircumflex", "Wdieresis", "Wgrave", "Yacute", "Ycircumflex", "Ydieresis", "Ygrave", "uni0232", "uni1EF8", "Zacute", "Zcaron", "Zdotaccent", "uni1EB8", "uni1EBC", "uni018F", "uni0122", "uni1ECA", "uni0136", "uni013B", "uni0145", "uni1E44", "uni1ECC", "uni0156", "uni0218", "uni1E9E", "uni0162", "uni021A", "uni1EE4", "uni0232", "uni1EF8", "Ebreve", "Gcaron", "Ibreve", "Obreve"],
                "Lowercase Extended": ["aacute", "abreve", "uni01CE", "acircumflex", "adieresis", "agrave", "amacron", "aogonek", "aring", "atilde", "ae", "aeacute", "cacute", "ccaron", "ccedilla", "cdotaccent", "eth", "dcaron", "dcroat", "eacute", "ecaron", "ecircumflex", "edieresis", "edotaccent", "egrave", "emacron", "eogonek", "uni1EBD", "gbreve", "uni0123", "gdotaccent", "hbar", "dotlessi", "iacute", "uni01D0", "icircumflex", "idieresis", "i.loclTRK", "igrave", "ij", "imacron", "iogonek", "itilde", "uni0237", "uni006A0301", "uni0137", "lacute", "lcaron", "uni013C", "lslash", "nacute", "ncaron", "uni0146", "eng", "ntilde", "oacute", "uni01D2", "ocircumflex", "odieresis", "ograve", "ohungarumlaut", "omacron", "oslash", "oslashacute", "otilde", "oe", "thorn", "racute", "rcaron", "uni0157", "sacute", "scaron", "scedilla", "uni0219", "germandbls", "tbar", "tcaron", "uni0163", "uni021B", "uacute", "uni01D4", "ucircumflex", "udieresis", "uni01D8", "uni01DA", "uni01DC", "uni01D6", "ugrave", "uhungarumlaut", "umacron", "uogonek", "uring", "utilde", "ubreve", "wacute", "wcircumflex", "wdieresis", "wgrave", "yacute", "ycircumflex", "ydieresis", "ygrave", "uni0233", "uni1EF9", "zacute", "zcaron", "zdotaccent", "uni1EB9", "uni0259", "uni1ECB", "uni1E45", "uni1ECD", "uni1EE5", "ebreve", "gcaron", "ibreve", "obreve"],
                "Small Caps Extended": ["aacute.sc", "abreve.sc", "acircumflex.sc", "adieresis.sc", "agrave.sc", "amacron.sc", "aogonek.sc", "aring.sc", "atilde.sc", "ae.sc", "aeacute.sc", "cacute.sc", "ccaron.sc", "ccedilla.sc", "cdotaccent.sc", "eth.sc", "dcaron.sc", "dcroat.sc", "eacute.sc", "ebreve.sc", "ecaron.sc", "ecircumflex.sc", "edieresis.sc", "edotaccent.sc", "edotbelow.sc", "egrave.sc", "emacron.sc", "eogonek.sc", "etilde.sc", "schwa.sc", "gbreve.sc", "gcaron.sc", "gcommaaccent.sc", "gdotaccent.sc", "hbar.sc", "iacute.sc", "ibreve.sc", "icircumflex.sc", "idieresis.sc", "idotaccent.sc", "idotbelow.sc", "igrave.sc", "ij.sc", "imacron.sc", "iogonek.sc", "itilde.sc", "jacute.sc", "kcommaaccent.sc", "lacute.sc", "lcaron.sc", "lcommaaccent.sc", "lslash.sc", "nacute.sc", "ncaron.sc", "ncommaaccent.sc", "ndotaccent.sc", "ntilde.sc", "eng.sc", "oacute.sc", "obreve.sc", "ocircumflex.sc", "odieresis.sc", "odotbelow.sc", "ograve.sc", "ohungarumlaut.sc", "omacron.sc", "oslash.sc", "oslashacute.sc", "otilde.sc", "oe.sc", "thorn.sc", "racute.sc", "rcaron.sc", "rcommaaccent.sc", "sacute.sc", "scaron.sc", "scedilla.sc", "scommaaccent.sc", "germandbls.sc", "tbar.sc", "tcaron.sc", "tcedilla.sc", "tcommaaccent.sc", "uacute.sc", "ubreve.sc", "ucircumflex.sc", "udieresis.sc", "udotbelow.sc", "ugrave.sc", "uhungarumlaut.sc", "umacron.sc", "uogonek.sc", "uring.sc", "utilde.sc", "wacute.sc", "wcircumflex.sc", "wdieresis.sc", "wgrave.sc", "yacute.sc", "ycircumflex.sc", "ydieresis.sc", "ygrave.sc", "ymacron.sc", "ytilde.sc", "zacute.sc", "zcaron.sc", "zdotaccent.sc"],
                "Numbers": ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
                "Small Cap Numbers": ["zero.sc", "one.sc", "two.sc", "three.sc", "four.sc", "five.sc", "six.sc", "seven.sc", "eight.sc", "nine.sc"],
                "Black Circled Numbers": ["uni24FF", "uni2776", "uni2777", "uni2778", "uni2779", "uni277A", "uni277B", "uni277C", "uni277D", "uni277E"],
                "Circled Numbers": ["uni24EA", "uni2460", "uni2461", "uni2462", "uni2463", "uni2464", "uni2465", "uni2466", "uni2467", "uni2468"],
                "Punctuation": ["period", "comma", "colon", "semicolon", "ellipsis", "exclam", "exclamdown", "question", "questiondown", "periodcentered", "bullet", "asterisk", "numbersign", "slash", "backslash", "comma.ss03", "semicolon.ss03", "parenleft", "parenright", "braceleft", "braceright", "bracketleft", "bracketright", "hyphen", "endash", "emdash", "underscore", "quotesinglbase", "quotedblbase", "quotedblleft", "quotedblright", "quoteleft", "quoteright", "guillemotleft", "guillemotright", "guilsinglleft", "guilsinglright", "quotedbl", "quotesingle"],
                "Prebuilt Fractions": ["onehalf", "uni2153", "uni2154", "onequarter", "threequarters", "oneeighth", "threeeighths", "fiveeighths", "seveneighths"],
                "Currency & Maths": ["cent", "currency", "dollar", "Euro", "florin", "sterling", "yen", "Euro.tf", "fraction", "plus", "minus", "multiply", "divide", "equal", "notequal", "greater", "less", "greaterequal", "lessequal", "plusminus", "approxequal", "asciitilde", "logicalnot", "asciicircum", "emptyset", "infinity", "integral", "uni2126", "uni2206", "product", "summation", "radical", "partialdiff", "uni00B5", "pi", "percent", "perthousand", "ordfeminine", "ordmasculine", "minute", "second", "uni2034", "lozenge"],
                "Symbols": ["at", "ampersand", "paragraph", "section", "copyright", "registered", "trademark", "degree", "bar", "brokenbar", "dagger", "uni2113", "daggerdbl", "estimated", "uni2116"],
                "Small Cap Extras": ["exclam.sc", "exclamdown.sc", "question.sc", "questiondown.sc", "florin.sc", "at.sc", "ampersand.sc", "copyright.sc", "cent.sc", "dollar.sc", "Euro.sc", "sterling.sc", "yen.sc"],
                "Arrows & Geometry": ["arrowup", "uni2197", "arrowright", "uni2198", "arrowdown", "uni2199", "arrowleft", "uni2196", "arrowboth", "arrowupdn", "uni261C", "uni261E", "uni25CF", "circle", "uni25C6", "uni25C7", "filledbox", "uni25A1", "triagup", "uni25B6", "triagdn", "uni25C0", "uni25B3", "uni25B7", "uni25BD", "uni25C1", "uni2661", "heart", "uniF8FF"],
                "Diacritics": ["dieresis", "dotaccent", "grave", "acute", "hungarumlaut", "circumflex", "caron", "breve", "ring", "tilde", "macron", "cedilla", "ogonek"]
            },
            suffixes: {
                // "sc": "Small Caps Extended",
                "cursive": "Single-story Alternates",
                "legible": "Legible Alternates",
                "case": "Case-Sensitive Forms",
                "tf": "Tabular Numbers",
                "osf": "Oldstyle Numbers",
                "tosf": "Tabular Oldstyle Numbers",
                "numr": "Numerators",
                "dnom": "Denominators",
                "zero": "Slashed Zero"
            }
        }
    },
    methods: {
        async opentypeLoadFile() {
            try {
                this.isLoading = true;
                const data = await opentype.load(this.webfont);
                this.f = data;

                var upm = this.f.unitsPerEm;
                var os2 = this.f.tables.os2;

                this.baselineOffset = 0;
                this.capHeightOffset = os2.sCapHeight / upm * this.fontSize;
                this.xHeightOffset = os2.sxHeight / upm * this.fontSize;
            } catch (err) {
                this.isError = true;
                this.errorInfo = err;
            } finally {
                this.isLoading = false;
                this.setCurrentGlyph(3); // A
            }
        },
        setCurrentGlyph(g) {
            this.currentSelection = this.glyphs[g];
        },
        getThumbnailOffsets(g) {
            var xLoc = 50 - (g.advanceWidth / 20 * 0.72);
            return "translate(" + xLoc + ", 75)";
        }
    },
    computed: {
        glyphsWithPath: function() {
            if (this.f && !this.isLoading) {
                return Object.values(this.f.glyphs.glyphs).filter(function(g) {
                    if (g.numberOfContours > 0) return g.name;
                });
            }
        },
        glyphs: function() {
            if (this.f && !this.isLoading) {
                return this.f.glyphs.glyphs;
            }
        },
        paths: function() {
            return '<path stroke="var(--gridline)" vector-effect="non-scaling-stroke" d="M0 0 L200 0" />' +
                   '<path stroke="var(--gridline)" vector-effect="non-scaling-stroke" stroke-dasharray="4,4" d="M0 ' + this.capHeightOffset * -1 + ' L200 ' + this.capHeightOffset * -1 + '" />' +
                   '<path stroke="var(--gridline)" vector-effect="non-scaling-stroke" stroke-dasharray="4,4" d="M0 ' + this.xHeightOffset * -1 + ' L200 ' + this.xHeightOffset * -1 + '" />';
        },
        currentGlyphTransform: function() {
            var xLoc = 100 - (this.currentSelection.advanceWidth / 20);

            return "translate(" + xLoc + ", 120) scale(1.39)";
        },
        sorted: function() {
            var sorted = {};

            if (this.f) {
                // For glyph in font
                for (var i = 0, l = this.f.glyphs.length; i < l; i ++) {
                    var inAnyGroup = false;
                    // Check if it’s in any predefined group
                    for (var j = 0, k = Object.keys(this.groups).length; j < k; j ++) {
                        // If it is in this group
                        if (Object.values(this.groups)[j].includes(this.f.glyphs.glyphs[i].name)) {
                            // Mark it as being grouped already then add it to the sorted dict
                            inAnyGroup = true;
                            (sorted[Object.keys(this.groups)[j]] = sorted[Object.keys(this.groups)[j]] || []).push(this.f.glyphs.glyphs[i]);
                        }
                    }

                    // Anything not in a group
                    // (either junk, unsorted glyphs, or opentype features)
                    if (!inAnyGroup) {
                        // If it splits, it’s an opentype feature (probably)
                        var parts = this.f.glyphs.glyphs[i].name.split(".");
                        if (parts.length > 1) {
                            var suffix = parts.slice(-1)[0];
                            // Check which feature group it belongs to and add it to the sorted dict
                            if (Object.keys(this.suffixes).includes(suffix)) {
                                (sorted[this.suffixes[suffix]] = sorted[this.suffixes[suffix]] || []).push(this.f.glyphs.glyphs[i]);
                            }
                        }
                        // Uncomment this block to see everything
                        // (useful for catching uncategorised glyphs)
                        // else {
                        //     (sorted["Other"] = sorted["Other"] || []).push(this.f.glyphs.glyphs[i]);
                        // }
                    }
                }
            }
            return sorted;
        },
        sortedMore: function() {
            if (this.sorted) {
                var sort_order = ["Uppercase",
                                "Small Caps",
                                "Lowercase",
                                "Numbers",
                                "Uppercase Extended",
                                "Lowercase Extended",
                                "Small Caps Extended",
                                "Single-story Alternates",
                                "Legible Alternates",
                                "Punctuation",
                                "Currency & Maths",
                                "Symbols",
                                "Arrows & Geometry",
                                "Circled Numbers",
                                "Black Circled Numbers"];
                var s = this.sorted;
                var m = {};

                for (var i = 0, l = sort_order.length; i < l; i ++) {
                    m[sort_order[i]] = s[sort_order[i]];
                    delete s[sort_order[i]];
                }

                var sortedMore = Object.assign({}, m, s);
                return sortedMore;
            }
        }
    },
    mounted: function () {
        this.opentypeLoadFile();
    },
    template: `
        <div class="glyphset__track">
            <div class="glyphset__follower">
                <p v-if="this.currentSelection" class="follower__labels normal subhead">
                    <span v-if="this.currentSelection.unicode">
                        &#[[ this.currentSelection.unicode ]];
                    </span>
                    <span v-if="!this.currentSelection.unicode">
                        (No Codepoint)
                    </span>
                    <span v-if="this.currentSelection.name">
                        "[[ this.currentSelection.name ]]"
                    </span>
                </p>

                <svg width="200" height="170" viewBox="0 0 200 170" v-if="this.currentSelection">
                    <g transform="translate(0, 120)" v-html="this.paths">
                    </g>

                    <g :transform="this.currentGlyphTransform" v-html="this.currentSelection.getPath().toSVG(3)" class="mode_fill">
                    </g>
                </svg>
            </div>
        </div>

        <ul class="glyphset__palette" v-if="!this.isLoading && !this.isError">
            <li class="glyphset__category" v-for="contents, label in this.sortedMore">
                <p class="normal subhead" >[[ label ]]</p>
                <ul class="glyphset__swatches">
                    <li class="glyphset__swatch" v-for="glyph in contents" v-on:click="setCurrentGlyph(glyph.index);">

                        <svg width="100" height="100" viewBox="0 0 100 100">
                            <g :transform="getThumbnailOffsets(glyph)" v-html="glyph.getPath().toSVG(1)" class="mode_fill">
                            </g>
                        </svg>
                    </li>
                </ul>
            </li>
        </ul>`
});


glyphset.mount('#glyphset');