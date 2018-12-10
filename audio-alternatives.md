# Ten ways of making audio books (or really any books)

## 1. CBZ-like

A folder contains multiple audio files:

```
first.mp3
second.mp3
third.mp3
```

They play in filename order.

The folder is zipped.


## 2. M4B

Audio packaging format that can include multiple audio files. 

## 3. EPUB-like

The only change required to EPUB 3 is to allow audio core media types as spine items. Packaging would be EPUB OCF.

## 4. Today's WPUB


```json
"readingOrder": [
    {
      "href": "http://example.org/part1.mp3", 
      "type": "audio/mpeg", 
      "bitrate": 128, 
      "duration": 1980, 
      "title": "Part 1"
    }, 
    {
      "href": "http://example.org/part2.mp3", 
      "type": "audio/mpeg", 
      "bitrate": 128, 
      "duration": 1200, 
      "title": "Part 2"
    }, 
    {
      "href": "http://example.org/part3.mp3", 
      "type": "audio/mpeg", 
      "bitrate": 128, 
      "duration": 1140, 
      "title": "Part 3"
    }
  ]

```

Packaging sold separately.


## 5. HTML Custom Element

```html
<w-pub>
    <audio controls src="flatland_1_abbott.mp3" title="Part 1: Sections 1–3"></audio>
    <audio controls src="flatland_2_abbott.mp3"></audio> 
    <audio controls src="flatland_3_abbott.mp3"></audio> 
    <audio controls src="flatland_4_abbott.mp3"></audio> 
    <audio controls src="flatland_5_abbott.mp3"></audio> 
    <audio controls src="flatland_6_abbott.mp3"></audio> 
    <audio controls src="flatland_7_abbott.mp3"></audio> 
    <audio controls src="flatland_8_abbott.mp3"></audio> 
</w-pub>

```

Packaging sold separately.

## 6. 