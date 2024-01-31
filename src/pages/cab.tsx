import { useState } from "react"
import CabTracker from "../service/cabservice"

const cab2data = [
    {
        "lat": 28.57045,
        "lng": 77.32162,
        "timestamp": "00:00:00",
        "heading": 230,
        "speed": 46,
    },
    {
        "lat": 28.56964,
        "lng": 77.32074,
        "timestamp": "00:00:30",
        "heading": 230,
        "speed": 46,
    },
    {
        "lat": 28.56964,
        "lng": 77.32074,
        "timestamp": "00:01:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.5685,
        "lng": 77.32181,
        "timestamp": "00:02:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56843,
        "lng": 77.32188,
        "timestamp": "00:02:20",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56801,
        "lng": 77.32226,
        "timestamp": "00:02:40",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56792,
        "lng": 77.32235,
        "timestamp": "00:03:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56792,
        "lng": 77.32235,
        "timestamp": "00:04:20",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56755,
        "lng": 77.32269,
        "timestamp": "00:04:50",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56693,
        "lng": 77.32323,
        "timestamp": "00:04:60",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56693,
        "lng": 77.32323,
        "timestamp": "00:05:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56701,
        "lng": 77.32332,
        "timestamp": "00:05:30",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56729,
        "lng": 77.32377,
        "timestamp": "00:05:50",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56781,
        "lng": 77.32444,
        "timestamp": "00:06:10",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56798,
        "lng": 77.32464,
        "timestamp": "00:06:30",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56823,
        "lng": 77.32487,
        "timestamp": "00:06:50",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56829,
        "lng": 77.32492,
        "timestamp": "00:07:10",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56829,
        "lng": 77.32492,
        "timestamp": "00:07:30",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.5685,
        "lng": 77.32513,
        "timestamp": "00:07:50",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56866,
        "lng": 77.32531,
        "timestamp": "00:08:10",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56989,
        "lng": 77.32679,
        "timestamp": "00:08:30",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.56989,
        "lng": 77.32679,
        "timestamp": "00:08:50",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57004,
        "lng": 77.32683,
        "timestamp": "00:09:30",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.5701,
        "lng": 77.32677,
        "timestamp": "00:09:50",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57066,
        "lng": 77.32619,
        "timestamp": "00:10:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57088,
        "lng": 77.32596,
        "timestamp": "00:10:30",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57108,
        "lng": 77.32575,
        "timestamp": "00:10:50",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57143,
        "lng": 77.32538,
        "timestamp": "00:11:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57225,
        "lng": 77.32453,
        "timestamp": "00:11:10",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57225,
        "lng": 77.32453,
        "timestamp": "00:11:30",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.57232,
        "lng": 77.32461,
        "timestamp": "00:11:50",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.57129,
        "lng": 77.32571,
        "timestamp": "00:12:00",
        "heading": 130,
        "speed": 460
    },
    {
        "lat": 28.57111,
        "lng": 77.3259,
        "timestamp": "00:12:20",
        "heading": 130,
        "speed": 460
    },
    {
        "lat": 28.57074,
        "lng": 77.3263
        ,
        "timestamp": "00:12:40",
        "heading": 130,
        "speed": 460
    },
    {
        "lat": 28.57045,
        "lng": 77.32663,
        "timestamp": "00:12:50",
        "heading": 130,
        "speed": 460
    },
    {
        "lat": 28.57013,
        "lng": 77.32698,
        "timestamp": "00:13:00",
        "heading": 130,
        "speed": 460
    },
    {
        "lat": 28.57003,
        "lng": 77.32709,
        "timestamp": "00:13:30",
        "heading": 130,
        "speed": 460
    },
    {
        "lat": 28.56995,
        "lng": 77.32717,
        "timestamp": "00:13:50",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56991,
        "lng": 77.32721,
        "timestamp": "00:14:00",
        "heading": 130,
        "speed": 460
    },
    {
        "lat": 28.56986,
        "lng": 77.32726,
        "timestamp": "00:15:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.5696,
        "lng": 77.32758,
        "timestamp": "00:15:30",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56951,
        "lng": 77.32766,
        "timestamp": "00:16:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56936,
        "lng": 77.32787,
        "timestamp": "00:16:30",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56918,
        "lng": 77.32816,
        "timestamp": "00:17:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56906,
        "lng": 77.32834,
        "timestamp": "00:17:30",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56832,
        "lng": 77.32953,
        "timestamp": "00:17:50",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56821,
        "lng": 77.3297
        ,
        "timestamp": "00:18:20",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56783,
        "lng": 77.33024,
        "timestamp": "00:18:30",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56692,
        "lng": 77.33161,
        "timestamp": "00:18:50",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56646,
        "lng": 77.33229,
        "timestamp": "00:19:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56592,
        "lng": 77.33304,
        "timestamp": "00:20:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56441,
        "lng": 77.33514,
        "timestamp": "00:21:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56436,
        "lng": 77.3352
        ,
        "timestamp": "00:22:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56352,
        "lng": 77.3365
        ,
        "timestamp": "00:23:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56352,
        "lng": 77.3365
        ,
        "timestamp": "00:24:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.5635,
        "lng": 77.33662,
        "timestamp": "00:25:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.563,
        "lng": 77.33732,
        "timestamp": "00:26:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56212,
        "lng": 77.33861,
        "timestamp": "00:27:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56206,
        "lng": 77.33878,
        "timestamp": "00:28:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56208,
        "lng": 77.33888,
        "timestamp": "00:29:00",
        "heading": 130,
        "speed": 46
    },
    {
        "lat": 28.56222,
        "lng": 77.33916,
        "timestamp": "00:30:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56234,
        "lng": 77.33932,
        "timestamp": "00:31:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56252,
        "lng": 77.33958,
        "timestamp": "00:32:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56257,
        "lng": 77.33973,
        "timestamp": "00:33:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56257,
        "lng": 77.33973,
        "timestamp": "00:34:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56277,
        "lng": 77.33994,
        "timestamp": "00:35:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56284,
        "lng": 77.34002,
        "timestamp": "00:36:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56311,
        "lng": 77.3403
        ,
        "timestamp": "00:37:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56329,
        "lng": 77.34052,
        "timestamp": "00:38:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56371,
        "lng": 77.34134,
        "timestamp": "00:39:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56476,
        "lng": 77.34275,
        "timestamp": "00:40:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56476,
        "lng": 77.34275,
        "timestamp": "00:41:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.5649,
        "lng": 77.34261,
        "timestamp": "00:42:00",
        "heading": 40,
        "speed": 46
    },
    {
        "lat": 28.56496,
        "lng": 77.34254,
        "timestamp": "00:43:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.56517,
        "lng": 77.34232,
        "timestamp": "00:44:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.56565,
        "lng": 77.34182,
        "timestamp": "00:45:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.56616,
        "lng": 77.34129,
        "timestamp": "00:46:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.56636,
        "lng": 77.34109,
        "timestamp": "00:47:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.56636,
        "lng": 77.34109,
        "timestamp": "00:48:00",
        "heading": 320,
        "speed": 46
    }
]

const cab1data = [
    {
        "lat": 28.57045,
        "lng": 77.32162,
        "timestamp": "00:00:00",
        "heading": 230,
        "speed": 46
    },
    {
        "lat": 28.56964,
        "lng": 77.32074,
        "timestamp": "00:01:00",
        "heading": 230,
        "speed": 46
    },
    {
        "lat": 28.56964,
        "lng": 77.32074,
        "timestamp": "00:01:30",
        "heading": 150,
        "speed": 46
    },
    {
        "lat": 28.5685,
        "lng": 77.32181,
        "timestamp": "00:02:00",
        "heading": 150,
        "speed": 46
    },
    {
        "lat": 28.56843,
        "lng": 77.32188,
        "timestamp": "00:02:10",
        "heading": 150,
        "speed": 46
    },
    {
        "lat": 28.56801,
        "lng": 77.32226,
        "timestamp": "00:02:30",
        "heading": 150,
        "speed": 46
    },
    {
        "lat": 28.56792,
        "lng": 77.32235,
        "timestamp": "00:02:50",
        "heading": 150,
        "speed": 46
    },
    {
        "lat": 28.56792,
        "lng": 77.32235,
        "timestamp": "00:03:00",
        "heading": 150,
        "speed": 46
    },
    {
        "lat": 28.56755,
        "lng": 77.32269,
        "timestamp": "00:03:10",
        "heading": 150,
        "speed": 46
    },
    {
        "lat": 28.56693,
        "lng": 77.32323,
        "timestamp": "00:03:30",
        "heading": 150,
        "speed": 46
    },
    {
        "lat": 28.56693,
        "lng": 77.32323,
        "timestamp": "00:04:00",
        "heading": 50,
        "speed": 46
    },
    {
        "lat": 28.56701,
        "lng": 77.32332,
        "timestamp": "00:04:10",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.56729,
        "lng": 77.32377,
        "timestamp": "00:04:30",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.56781,
        "lng": 77.32444,
        "timestamp": "00:05:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.56798,
        "lng": 77.32464,
        "timestamp": "00:05:10",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.56823,
        "lng": 77.32487,
        "timestamp": "00:05:30",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.56829,
        "lng": 77.32492,
        "timestamp": "00:05:40",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.56829,
        "lng": 77.32492,
        "timestamp": "00:06:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.56913,
        "lng": 77.32601,
        "timestamp": "00:06:30",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.56938,
        "lng": 77.32632,
        "timestamp": "00:06:40",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57053,
        "lng": 77.32781,
        "timestamp": "00:07:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57074,
        "lng": 77.3281,
        "timestamp": "00:07:20",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57175,
        "lng": 77.32946,
        "timestamp": "00:07:30",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57178,
        "lng": 77.32949,
        "timestamp": "00:07:40",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57212,
        "lng": 77.32992,
        "timestamp": "00:08:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57246,
        "lng": 77.33037,
        "timestamp": "00:09:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57257,
        "lng": 77.33053,
        "timestamp": "00:10:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57262,
        "lng": 77.33059,
        "timestamp": "00:11:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57262,
        "lng": 77.33059,
        "timestamp": "00:12:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57278,
        "lng": 77.33064,
        "timestamp": "00:13:30",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57332,
        "lng": 77.33137,
        "timestamp": "00:14:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57496,
        "lng": 77.33361,
        "timestamp": "00:15:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57516,
        "lng": 77.33388,
        "timestamp": "00:16:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57516,
        "lng": 77.33388,
        "timestamp": "00:17:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57531,
        "lng": 77.33401,
        "timestamp": "00:18:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.5754,
        "lng": 77.33402,
        "timestamp": "00:19:00",
        "heading": 50
        ,
        "speed": 46
    },
    {
        "lat": 28.57547,
        "lng": 77.33401,
        "timestamp": "00:19:30",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57562,
        "lng": 77.33386,
        "timestamp": "00:20:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57601,
        "lng": 77.33347,
        "timestamp": "00:21:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.5762,
        "lng": 77.33333,
        "timestamp": "00:21:30",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57653,
        "lng": 77.33305,
        "timestamp": "00:22:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57676,
        "lng": 77.33283,
        "timestamp": "00:23:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57714,
        "lng": 77.33247,
        "timestamp": "00:24:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57756,
        "lng": 77.33207,
        "timestamp": "00:25:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57775,
        "lng": 77.33189,
        "timestamp": "00:25:30",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57793,
        "lng": 77.33172,
        "timestamp": "00:26:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.5783,
        "lng": 77.33134,
        "timestamp": "00:26:30",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57864,
        "lng": 77.33093,
        "timestamp": "00:27:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57878,
        "lng": 77.3308,
        "timestamp": "00:27:30",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57897,
        "lng": 77.33062,
        "timestamp": "00:28:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.5792,
        "lng": 77.33039,
        "timestamp": "00:29:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57929,
        "lng": 77.33031,
        "timestamp": "00:29:30",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.57969,
        "lng": 77.32994,
        "timestamp": "00:30:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.5804,
        "lng": 77.32924,
        "timestamp": "00:41:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.58049,
        "lng": 77.32915,
        "timestamp": "00:42:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.58113,
        "lng": 77.32855,
        "timestamp": "00:43:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.58151,
        "lng": 77.32819,
        "timestamp": "00:44:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.58178,
        "lng": 77.32793,
        "timestamp": "00:45:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.58195,
        "lng": 77.32778,
        "timestamp": "00:46:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.58195,
        "lng": 77.32778,
        "timestamp": "00:47:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.58265,
        "lng": 77.32711,
        "timestamp": "00:48:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.58273,
        "lng": 77.32705,
        "timestamp": "00:49:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.58288,
        "lng": 77.32691,
        "timestamp": "00:50:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.58288,
        "lng": 77.32691,
        "timestamp": "00:51:00",
        "heading": 320,
        "speed": 46
    },
    {
        "lat": 28.58295,
        "lng": 77.32677,
        "timestamp": "00:52:00",
        "heading": 230,
        "speed": 46
    },
    {
        "lat": 28.58298,
        "lng": 77.32667,
        "timestamp": "00:53:30",
        "heading": 230,
        "speed": 46
    },
    {
        "lat": 28.58298,
        "lng": 77.32655,
        "timestamp": "00:54:00",
        "heading": 230,
        "speed": 46
    },
    {
        "lat": 28.58228,
        "lng": 77.32557,
        "timestamp": "00:55:00",
        "heading": 230,
        "speed": 46
    },
    {
        "lat": 28.58204,
        "lng": 77.32524,
        "timestamp": "00:56:00",
        "heading": 230,
        "speed": 46
    },
    {
        "lat": 28.58175,
        "lng": 77.32486,
        "timestamp": "00:57:00",
        "heading": 230,
        "speed": 46
    },
    {
        "lat": 28.58175,
        "lng": 77.32486,
        "timestamp": "01:58:00",
        "heading": 230,
        "speed": 46
    },
    {
        "lat": 28.58078,
        "lng": 77.32346,
        "timestamp": "01:59:00",
        "heading": 230,
        "speed": 46
    },
    {
        "lat": 28.58078,
        "lng": 77.32346,
        "timestamp": "02:00:00",
        "heading": 230,
        "speed": 46
    }
]

const Cab = () => {
    const [mapData, setMapData] = useState<any>([])
    const [cab, setCab] = useState("")
    const handlechange = (e: any) => {
        setCab(e.target.value)
        if (e.target.value === "driver A") {
            setMapData(cab2data)
        } else {
            setMapData(cab1data)
        }
    }
    return (
        <>
            <span>
                <select name="user" id="user" onChange={handlechange}>
                    <option value="">choose cab</option>
                    <option value="driver A">driver A</option>
                    <option value="driver B">driver B</option>
                </select>
            </span>
            <CabTracker sampleData={mapData} name={cab} key={mapData} />
        </>
    )
}

export default Cab;