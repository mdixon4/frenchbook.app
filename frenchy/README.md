# Frenchy

## Basic Grids

The `|` character is a barline. Surround chords with barlines to create a chart. Simple as that.

```
| F | Bb | F | C7 |
| Gm7 | C7 | F | C7 |
```

In most cases, you don't need the spaces between the barlines, if you don't want. This is equivalent:

```
|F|Bb|F|C7|
|Gm7|C7|F|C7|
```

Or, you can add extra spaces. You might want to do it to line up your plain-text version:

```
| F  | Bb | F  | C7 |
| Gm7| C7 | F  | C7 |
```

_Technically,_ you don't need the final barline, in most cases.

If you want to add another **Stanza**, just leave at least one empty line:

```
| F  | Bb | F  | C7 |
| Gm7| C7 | F  | C7 |

| D7 | Dm7| Gm7| G7 |
| C7 | C#m| Dm7| G7 |
```

* Repeat the previous bar with `-`
* You can leave a bar blank
* You can cause a chord to be a stop chord by appending `.`. Stop chords are designated with a grey fill.
* Empty bars can be stop bars too, just type `.` without a chord.

```
| F | - | . | C7. |
```

Add more than one chord per bar. 

* Two chords will be separated with a diagonal line. 
* If you indicate that either chord should last for three beats by following it with `- -` (repeat, repeat) then the longer chord takes three-quarters of the bar.
* You can put three or four chords in a bar. If you put three, indicate which one should cover two beats by following it with a `-`

```
| F C7 | F - - C7 | F C7 - - | F Gm7 C7 - | F - Gm7 C7 | F D7 Gm7 C7 |
```

* Half-diminished can be spelled `Fhalfdim` and full diminished `Fdim` - these will render with a slashed circle and a circle. The major triangle can be spelled `^`

Lines don't have to be the same length. For example, a stomp has an 18-bar form:

```
| Eb7     | -      | Ab      | -      |
| Eb7 Fm7 |Cdim Eb7|Ab7 Dbdim| Ddim Ab|
| Eb7     | -      | Ab      | Ab7    |
| Db Fdim | Ab  F7 | Bb7 Eb7 | Ab F7  |
| Bb7 Eb7 | Ab     |
```

_Note, I normally wouldn't bother lining up the barlines like this, but it's good for illustration._

If you want the shorter line to be right-aligned instead of left-aligned, lead with at least one space:

```
| Eb7     | -      | Ab      | -      |
| Eb7 Fm7 |Cdim Eb7|Ab7 Dbdim| Ddim Ab|
| Eb7     | -      | Ab      | Ab7    |
| Db Fdim | Ab  F7 | Bb7 Eb7 | Ab F7  |
                   | Bb7 Eb7 | Ab     |
```

_Only one space is required here, but I've put plenty in order to line it up with the right-side of the line above._

Alternatively, lead with a number of `>` characters to advance it that many bars to the right. So to centre align that last line, use just one `>`. The last four lines are equivalent here:

```
| Db Fdim | Ab  F7 | Bb7 Eb7 | Ab F7  |
>         | Bb7 Eb7 | Ab     |
         >| Bb7 Eb7 | Ab     |
> | Bb7 Eb7 | Ab     |
>| Bb7 Eb7 | Ab     |
```

## Stanza Alignment and Spacing

The stanza, by default, is centred horizontally on the page. But you can move the whole stanza around too by giving it a class.

To apply a class, you type `.` followed by the name of the class. For example, `.indent-0` aligns your stanza to the left of the page.

You can apply a class to a stanza by writing it above the stanza. Do not leave an empty line between the class and the stanza (but **do** leave an empty line between any previous stanza and the class!):

```
.indent-0
| Ab | Adim | Bbm | Eb7 |
```

There are a raft of classes which can be applied to a stanza. We'll meet them as we go. But to align the stanza horizontally, use `.indent-X` where _X_ is the number of bar-widths from the left margin. Half-bar-widths are possible too, but spell them `.indent-0-5`, `.indent-1-5`, etc.

```
.indent-0
| Ab | Adim | Bbm | Eb7 |

.indent-0-5
| Ab | Adim | Bbm | Eb7 |

.indent-1
| Ab | Adim | Bbm | Eb7 |

.indent-1-5
| Ab | Adim | Bbm | Eb7 |

.indent-2
| Ab | Adim | Bbm | Eb7 |
```

There are also classes for adjusting the vertical space between stanzas:

* `.flush` - no space between prior stanza and this one
* `.tight` - half the normal space
* `.cosy` - three-quarters of the normal space
* `.comfortable` - the default amount of space. You wouldn't normally need to set this, since it's the default. It's equivalent to half the height of a bar.
* `.loose` - one-and-a-half times the normal space
* `.roomy` - twice the normal space


```
| Ab | Adim | Bbm | Eb7 |

.flush
| Ab | Adim | Bbm | Eb7 |

.tight
| Ab | Adim | Bbm | Eb7 |

.cosy
| Ab | Adim | Bbm | Eb7 |

.comfortable
| Ab | Adim | Bbm | Eb7 |

.loose
| Ab | Adim | Bbm | Eb7 |

.roomy
| Ab | Adim | Bbm | Eb7 |
```

## Horizontal Lines

You can also draw horizontal dashed lines which may help separate parts of the song. Simply write `---` on a new line, and make sure there are empty lines before and after it.

If you don't want it to span the full width of the page, you can prepend it with a number of `>` and/or append it with a number of `<`. Each of these moves the end in half a bars width from the margin.

```
---

>---<

>>>>---
```



## Alternate Barlines

Various alternate barlines exist:

* `|` is the default barline
* `||` double barline
* `|:` and `:|` repeat barline
* `|(` and `)|` bracketed barline - to indicate the chord in this bar is optional (e.g. a turnaround bar that wouldn't be played last time).

Some of these barlines (especially the brackets) can be misconstrued as part of chords if they are not separated by a space character.

These barlines can be combined:

```
|: Dm | A7 | Dm | Bb7 A7 |
| Gm  | Ghalfdim | Dm ||( A7 :)|
```

TODO: A bug means this barline is not recognised: `:)|`

## Annotations

### Interior Annotations

You may add annotations to the bar by enclosing text in double quotes. If you put it before the chord it will appear above the chord in the bar, otherwise it will appear below.

If the bar is empty, or a blank stop bar, it will be centered vertically.

Some special characters are available to you to use:

* `\fermata` and `\fermata-up` (the upside down fermata)
* `\coda`
* `\right-down` `\down-right` `\down-left` (90 degree arrows)
* `\segno`
* `\n` a line break
* `\ ` a space character (special use)
* `\\` a back-slash

```
| F "fast" | "LOUDER!" - | "(Clarinet)" | . "silent!" | "\fermata" G7 | C7 "To \segno" |
```

You can determine whether the text will be aligned left, right or centre.

* `"Left "` note the trailing space
* `" Right"` note the leading space
* `"Centre"` or `" Centre "` or `" Centre   "` if there are neither leading nor trailing spaces, or if there are _both_ leading and trailing spaces, the annotation is centred. However, after the first space is trimmed from either end, additional spaces are considered in aligning. So to push your note a little left of center, type `" My note     "`. The additional spaces to the right of the text will cause the text to move left.

You can also type rhythmic guides. Surround the text with `{...}` and your text becomes rhythms!

* Whole notes (semibreves) are `w`, whole rests are `W`
* Half notes (minims) are `h`, half rests are `H`
* Quarter notes (crotchets) are `q`, quarter rests are `Q`
* Eighth notes (quavers) are `e`, eigth rests are `E`. But experiment with `r`, `t` and `y` which can do beaming.
* Sixteenth notes (semiquavers) are `s`, sixteenth rests are `S`
* Ties are `-`
* Other characters are available, see matthewhindson.com
* Space out your notes with the space bar

You don't need double quotes around these annotations unless you want to have text as well. Or, if you want to avail yourself of the aforementioned alignment options.

```
| Ab {Qry-eqe} | Bbm { q  q  H  } | Eb7 "slow {q}" | Ab " {q}" |
```

_The second bar has plenty of spaces to spread out the notation nicely. The third bar illustrates combining text and rhythmic notation, while the fourth bar shows how to align a rhythm to the right (enclose it in an aligned text annotation)._

### Interior Rhythms as a Separate Line

If a line has a lot of rhythmic annotations, it may be clearer to separate them on their own line. In this case, follow the line with the chords with a second line which starts with `{` (optionally ending with `}`). Write the rhythms for each bar, and separate each bar with `|`:

```
| Eb | - | Ab | - |
{ q.eEryE | | q.eEryE | q.eEryE }
| Eb | - | Ab. | . |
{ q.eEryE | q.eEryE }
```

_Leave a bar empty if you don't want to draw rhythms in it (Bar 2). You don't need to draw empty bars if you don't need to draw rhythms beyond that point (Line 2 - only two bars of rhythm are provided)._


### Exterior Annotations

You can add a title by typing in the first line above the stanza. Yes the same line as the classes we added:

```
Chorus .indent-2
| C | G | C | G | C |
```

In some cases, often to save space, you might prefer to put the title to the left of the stanza rather than above it. Here's where you can add more classes.

```
Chorus .indent-2
| C | G | C | G | C |

Chorus .title-left
| C | G | C | G | C |

Chorus .title-left .title-sideways
| C | G | C | G | C |
```

You can also add other annotations all around the exterior of the shape, by typing them _after_ the stanza (do not leave an empty line) like so:

* `left: If needed` - "If needed" will be centred to the left of the stanza.
* `top-left: \segno` - The segno symbol will be at the top-left of the stanza.
* `bottom: Faster!` - "Faster!" will be centred below the stanza.

You can align the text rather than centering it:
* Prepending `>>>` will align the text right (if horizontal) or bottom (if vertical)
* Appending `<<<` will align the text left (if horizontal) or top (if vertical)

You can specify the columns (for `top` and `bottom`) or rows (for `left` and `right`) that the annotation will span if you don't want to span the whole stanza.

* `right (1): With clarinet<<<` - "With clarinet" will be at the right of the first line, aligned with the top of the line.
* `top 2,3: Slow` - "Slow" will be centred over columns 2 and 3 (i.e. it will sit over the barline between them). The brackets are optional.

You might want to better indicate the columns or rows that the annotation refers to.

* Surround your text with `___`, `---` or `...` to draw a volta-bracket, a dotted volta bracket, or ellipses over the range indicted (ellipses only work for top/bottom, not left & right). If you only _prepend_ your text with these, your text will be right-aligned. If you only _append_ these symbols, your text will be left aligned. In most cases you will want to _surround_ your text if you're using `___` or `---`, and only _append_ if you're using `...`, but exceptions exist.

You can add the class .sideways to text on the left or right and it will be rendered sideways.

Some examples:

* `right (3,4): ___No tambourine___` - displays "No tambourine" to the right of lines 3 and 4, and draws a square bracket to clearly indicate that lines 3 and 4 are considered.
* `top: ---With caution` - displays "With caution" aligned right above the top of the stanza, but a _dotted_ line shows we are indicating the entire width of the stanza.
* `bottom (7,8): rit...` - displays "rit" left-aligned below column 7, with an ellipsis extended after it until the end of column 8.
* `left: Take no prisoners<<< .sideways` - displays "Take no prisoners" to the left of the stanza, written sideways, and aligned with the top of the stanza.

```
| | | | | | | | | 
| | | | | | | | |
| | | | |
| | | | | 
right (3,4): ___No tambourine___
top: ---With caution
bottom (7,8): rit...
left: Take no prisoners<<< .sideways
```


### Note

An annotation spans the whole width/height specified (or the whole width/height of the stanza if nothing is specified) even if the text only takes up a small amount. So for example, if you wanted two short annotations on the bottom, one aligned left and one aligned right, this would **not** give the desired effect.

```
| | | | | | | | |
bottom: Left aligned text<<<
bottom: >>>Right-aligned text
```

Because they each technically span the whole width of the stanza, they stack on top of each other. Instead, give each one a limited width:

```
| | | | | | | | |
bottom 1,2: Left aligned text<<<
bottom 7,8: >>>Right-aligned text
```



## Front Matter

Front matter precedes the song data and is separated from it by line consisting of `===`.

The template you're using determines what front matter is available. For the default template, the following keys are rendered:

* `title: My Song Title`
* `credits: Johnson/Johnson, 1909`
* `number: 999`

As well, some parameters are available to adjust the page layout.

* `barHeight: 1` - a multiplier of the base bar height. If the song is a little long to fit on one page, try reducing this to `0.95`, `0.9`...
* `barWidth: 1` - a multiplier of the base bar width. For example, if you want your page to fit 8.5 bars across, set this to `16/17` (figure it out)

Other front matter options are being considered.

## Markdown in Textual Content

In most places where you can write text, you can use Markdown. Basic markdown includes:

* Surround text with `**` to indicate bold
* Surround with `_` to indicate italic

## Text Blocks

It may be useful to add text content, e.g. lyrics, other notes. Just surround your text with `"""..."""`. If you have empty lines in your text content, the system will not be able to cope. Add a backslash to escape the empty lines:

```
"""
Ob-la-di, ob-la-da, life goes on, Ra!
La la how the life goes on.
\
And if you want some fun,
Take ob-la-di-la-da!
"""
```

TODO: Layout classes (`.indent-4`, `.tight`, etc.) should work here.

## Arrows

It's quite common to need to indicate a tag of some sort. If you give a **bar** a class of `.to-coda` an coda symbol and arrow will be drawn outside the bar. This class doesn't work for bars in the middle of the stanza. It is often advisable to restructure the stanza so the `.to-coda` bar is an edge bar (bottom edge or right edge).

Likewise, applying a `.coda` class to a **stanza** will display a coda symbol and arrow before the first bar of the stanza. For example, the arrangement below indicates that the tag comes at the end of the 12-bar blues:

```
Chorus
| Bb | - | - | - |
| Eb | - | Bb | - |
| F7 | Eb | Bb | - .to-coda |

.coda
| Eb | Gb7 | Bb | - |
```

In some cases, it might aid comprehension to align the tag such that the first bar of the tag is below and to the right of the last bar of the main section that will be played. For example:

```
| Bb | - | G7 | - |
| Cm | F7 | Bb .to-coda | - |

.coda
>>>>>| G7 |
| Cm | - | F7 | - | Bb | - | - | F7 Bb |
```

In this case, you can take advantage of `.coda-immediate` which reduces clutter by combining the arrows. Remove the `.to-coda` class and replace the `.coda` class on the tag with `.coda-immediate`:

```
| Bb | - | G7 | - |
| Cm | F7 | Bb | - |

.coda-immediate
>>>>>| G7 |
| Cm | - | F7 | - | Bb | - | - | F7 Bb |
```

In some cases you might want to use this construct on a section that isn't a tag. The `.immediate` class gives you the arrow without the coda symbol.


## Style Overrides

In some rare cases, you may want to surgically adjust the rendering. You can do this by injecting your own CSS, which follows the song, again separated by a line `===`. This is useful for example to absolutely position a stanza:

```
Chorus
| F | - | Bb | - |
| C7 | - | Bb | C7 |

Verse
| F | - | - | - |
| F | C7 | Bb | C7 |

.coda-immediate .indent-6-5 .tight .absolute .coda-bar
| F {q.  e H}|

===
.coda-bar {
top: calc(4 * var(--bar-height));
}
```

Or, it may be useful to shrink the font in places it won't fit.

```
title: This is a long long title that won't normally fit in one line
===

| Ab | Bbm Eb7 | Ab | Bdim | Eb G7/D | C9 | . { ryEeryEe } .smaller | . { ryEeryQ } .smaller |

===
.title-bar .title {
font-size: 1.8rem;  
}

.smaller .rhythms {
font-size: 1em;
transform: scale(0.9);
transform-origin: left;
}
```