(function (global) {
  'use strict';

  // ["horizon", "vertical", "superElevation" ,"girderLayoutInput", "SEShape", "girderBaseInfo" , "xbeamLayout", "xbeamSectionList", "diaphragmLayout", "diaphragmSectionList", "vStiffLayout", "vStiffSectionList", "hBracingLayout", "hBracingSectionList", ]

  // 테스트용 ... 다른곳에서 건드리지 말것 ....
  // 건드리더라도 read-only , 내부  값 바꾸지 말것 ...
  // multiLineStringComp 에서 shallow copy 중

  const defaultValues = {
    horizon: [
      [178551192.87, 552443319.55, 0, 0, 0],
      [178321130.9, 552413588.4, 200000, 100000, 100000],
      [178264931.8, 551804205.7, 200000, 100000, 90000],
      [178142699.05, 551723237.52, 0, 0, 0]
    ],
    vertical: [
      { name: 1, station: 0.0, elevation: 15421.0, curveLength: 0.0 },
      { name: 2, station: 140000.0, elevation: 15632.0, curveLength: 100000.0 },
      { name: 3, station: 540000.0, elevation: 17632.0, curveLength: 80000.0 },
      { name: 4, station: 820000.0, elevation: 19592.0, curveLength: 120000.0 },
      { name: 5, station: 1260000.0, elevation: 27072.0, curveLength: 120000.0 },
      { name: 6, station: 1650000.0, elevation: 30979.7, curveLength: 240000.0 },
      { name: 7, station: 1990000.0, elevation: 20439.7, curveLength: 100000.0 },
      { name: 8, station: 2180000.0, elevation: 19869.7, curveLength: 0.0 },
      { name: 9, station: 2373000.14, elevation: 17552.0, curveLength: 0.0 }
    ],
    superElevation: [
      { name: 1, station: 700000.0, left: 7.0, right: -7.0 },
      { name: 2, station: 720000.0, left: 7.0, right: -7.0 },
      { name: 3, station: 740000.0, left: 5.0, right: -5.0 },
      { name: 4, station: 760000.0, left: 3.0, right: -3.0 },
      { name: 5, station: 780000.0, left: 2.0, right: -2.0 },
      { name: 6, station: 814500.0, left: 2.0, right: -2.0 },
      { name: 7, station: 820000.0, left: 0.36, right: -0.36 },
      { name: 8, station: 821000.0, left: 0.2, right: -0.2 },
      { name: 9, station: 831200.0, left: -1.47, right: 1.47 },
      { name: 10, station: 834200.0, left: -1.96, right: 1.96 },
      { name: 11, station: 838000.0, left: -2.58, right: 2.58 },
      { name: 12, station: 840000.0, left: -2.91, right: 2.91 },
      { name: 13, station: 841500.0, left: -3.15, right: 3.15 },
      { name: 14, station: 860000.0, left: -6.18, right: 6.18 },
      { name: 15, station: 880000.0, left: -7.0, right: 7.0 },
      { name: 16, station: 1081000.0, left: -7.0, right: 7.0 },
      { name: 17, station: 1100000.0, left: -4.3, right: 4.3 },
      { name: 18, station: 1103000.0, left: -3.76, right: 3.76 },
      { name: 19, station: 1120000.0, left: -0.7, right: 0.7 },
      { name: 20, station: 1123500.0, left: -0.07, right: 0.07 },
      { name: 21, station: 1124500.0, left: 0.11, right: -0.11 },
      { name: 22, station: 1140000.0, left: 2.0, right: -2.0 },
      { name: 23, station: 1440000.0, left: 2.0, right: -2.0 },
      { name: 24, station: 1442600.0, left: 2.26, right: -2.26 },
      { name: 25, station: 1445500.0, left: 2.55, right: -2.55 },
      { name: 26, station: 1446000.0, left: 2.6, right: -2.6 },
      { name: 27, station: 1447700.0, left: 2.77, right: -2.77 },
      { name: 28, station: 1460000.0, left: 4.0, right: -4.0 },
      { name: 29, station: 1480000.0, left: 5.0, right: -6.0 },
      { name: 30, station: 1492000.0, left: 7.0, right: -7.0 },
      { name: 31, station: 1620000.0, left: 7.0, right: -7.0 }
    ],
    beginStation: 769452.42,
    slaveOrMaster: true,

    
    girderLayoutInput: {
      baseValue: {
        bridgeBeginStation: 1208150
      },
      supportData: [
        { name: "시점", angle: 90, spanlength: 0 },
        { name: "A1", angle: 90, spanLength: 700 },
        { name: "P1", angle: 90, spanLength: 55000 },
        // { name: "P2", angle: 90, spanLength: 55000 },
        // { name: "P3", angle: 90, spanLength: 60000 },
        // { name: "P4", angle: 90, spanLength: 60000 },
        // { name: "P5", angle: 90, spanLength: 55000 },
        { name: "A2", angle: 89.7708167291586, spanLength: 55000 },
        { name: "종점", angle: 90, spanLength: 800 }
      ],
      getGirderList: [
        { baseAlign: "align1", alignOffset: -100.0, isBeam: false },
        { baseAlign: "align1", alignOffset: 5010.0, isBeam: false },
        // { baseAlign: "align1", alignOffset: 10010.0, isBeam: false }
      ]
    },
    SEShape: {
      start: {
        A: 150,
        B: 300,
        C: 150,
        D: 50,
        E: 500,
        F: 2000,
        G: 1000,
        // J: 470,
        // S: 270,
        Taper: "parallel"
      },
      end: {
        A: 250,
        B: 300,
        C: 250,
        D: 50,
        E: 500,
        F: 2000,
        G: 1000,
        // J: 470,
        // S: 270,
        Taper: "parallel"
      },
      etc:{a:1}
    },

    girderBaseInfo: [
      { girderIndex: 0, 
        section: {B: 1700, UL: 1050, UR: 1050, C: 200, D: 200, C1: 100, D1: 100, H: 2000 },
        height: [
          //straight/circle/parabola
          { start: "G1K1", end: "G1H1", startH: 2000, endH: 2000, type: "straight" },
          { start: "G1H1", end: "G1H2", startH: 2000, endH: 2500, type: "circle" },
          { start: "G1H2", end: "G1H3", startH: 2500, endH: 2500, type: "straight" },
          { start: "G1H3", end: "G1H4", startH: 2500, endH: 2000, type: "circle" },
          { start: "G1H4", end: "G1K6", startH: 2000, endH: 2000, type: "straight" }
        ],
        slabThickness: [
          //straight/
          { start: "G1K1", end: "G1K2", startH: 470, endH: 470, type: "straight" },
          { start: "G1K2", end: "G1K3", startH: 470, endH: 270, type: "straight" },
          { start: "G1K4", end: "G1K5", startH: 270, endH: 470, type: "straight" },
          { start: "G1K5", end: "G1K6", startH: 270, endH: 470, type: "straight" },

        ],
        uFlange: [
          { start: "G1K1", end: "G1TF1", thickness: 18, startW: 400, endW: 400 },
          { start: "G1TF1", end: "G1T1", thickness: 18, startW: 400, endW: 400 },
          { start: "G1T1", end: "G1T2", thickness: 18, startW: 400, endW: 950 },
          { start: "G1T2", end: "G1T3", thickness: 18, startW: 1300, endW: 1300 },
          { start: "G1T3", end: "G1T4", thickness: 18, startW: 950, endW: 400 },
          { start: "G1T4", end: "G1K6", thickness: 18, startW: 400, endW: 400 },
        ],
        lFlange: [
          { start: "G1K1", end: "G1K6", thickness: 20 }],
        web: [
          { start: "G1K1", end: "G1K6", thickness: 14 }],
        uRib: [
          { start: "G1K1", end: "G1K6", thickness: 14, height: 150, layout: [-125, 125] }
        ],
        lRib: [
          { start: "G1K1", end: "G1K6", thickness: 14, height: 150, layout: [-125, 125] }
        ]
      },
      {
        girderIndex: 1,
        section: {
          B: 1700,
          UL: 1050,
          UR: 1050,
          C: 200,
          D: 200,
          C1: 100,
          D1: 100,
          H: 2000
        },
        height: [
          //straight/circle/parabola
          { start: "G2K1", end: "G2H1", startH: 2000, endH: 2000, type: "straight" },
          { start: "G2H1", end: "G2H2", startH: 2000, endH: 2500, type: "circle" },
          { start: "G2H2", end: "G2H3", startH: 2500, endH: 2500, type: "straight" },
          { start: "G2H3", end: "G2H4", startH: 2500, endH: 2000, type: "circle" },
          { start: "G2H4", end: "G2K6", startH: 2000, endH: 2000, type: "straight" }
        ],
        slabThickness: [
          //straight/
          { start: "G2K1", end: "G2K2", startH: 470, endH: 470, type: "straight" },
          { start: "G2K2", end: "G2K3", startH: 470, endH: 270, type: "straight" },
          { start: "G2K4", end: "G2K5", startH: 270, endH: 470, type: "straight" },
          { start: "G2K5", end: "G2K6", startH: 470, endH: 470, type: "straight" },

        ],
        uFlange: [
                 { start: "G2K1", end: "G2K6", thickness: 18, startW: 400, endW: 400 }
        ],
        lFlange: [
          { start: "G2K1", end: "G2K6", thickness: 20 }
        ],
        web: [
          { start: "G2K1", end: "G2K6", thickness: 14 }
        ],
        uRib: [
          {start: "G2K1", end: "G2K6", thickness: 14, height: 150, layout: [-125, 125]}
        ],
        lRib: [
          {start: "G2K1", end: "G2K6", thickness: 14, height: 150, layout: [-125, 125]}
        ]
      },
    ],

    xbeamLayout: [
      { iNode: "G1D5", jNode: "G2D5", section: "xbeamK" },
      { iNode: "G1D3", jNode: "G2D3", section: "xbeamK" },
      { iNode: "G1D1", jNode: "G2D1", section: "xbeamK" },
      { iNode: "G1D7", jNode: "G2D7", section: "xbeamK" },
      { iNode: "G1D9", jNode: "G2D9", section: "xbeamK" },
      { iNode: "G1D12", jNode: "G2D12", section: "xbeamK" },
      { iNode: "G1D14", jNode: "G2D14", section: "xbeamK" },
      { iNode: "G1D16", jNode: "G2D16", section: "xbeamK" },
      { iNode: "G1D18", jNode: "G2D18", section: "xbeamK" },
      { iNode: "G1D20", jNode: "G2D20", section: "xbeamK" },
      { iNode: "G1S1", jNode: "G2S1", section: "xbeamI" },
      { iNode: "G1S2", jNode: "G2S2", section: "xbeamI" },
      { iNode: "G1S3", jNode: "G2S3", section: "xbeamI" },
      // { iNode: "G1S4", jNode: "G2S4", section: "xbeamI" },
      // { iNode: "G1S5", jNode: "G2S5", section: "xbeamI" },
      // { iNode: "G1S6", jNode: "G2S6", section: "xbeamI" },
      // { iNode: "G1S7", jNode: "G2S7", section: "xbeamI" }
      // {iNode:"G1K1",jNode:"G2K1",section:"xbeam1"},
      // {iNode:"G1K2",jNode:"G2K2",section:"xbeam1"},
      // {iNode:"G1K3",jNode:"G2K3",section:"xbeam1"},
    ],

    xbeamSectionList: {
      xbeamI: {
        connectorWidth: 600,
        connectorLength: 500,
        upperFlangeThickness: 14,
        upperFlangeWidth: 300,
        webThickness: 10,
        lowerFlangeThickness: 14,
        lowerFlangeWidth: 300,
        vStiffThickness: 10,
        vStiffBottomOffset: 50,
        vStiffWidth: 150,
        vStiffendFillet: 140,
        scallopRadius: 35
      },
      xbeamK: {
        topOffset: 200,
        bottomOffset: 250,
        gussetThickness: 12,
        gussetBondingLength: 240,
        gussetWeldingOffset: 20,
        gussetTopWidth: 600,
        gussetBottomWidth: 400,
        gussetCenterWidth: 800,
        hFrameEndOffset: 70,
        diaFrameEndOffset: 220,
        //L150x150x12 section point, origin = (0,0)
        pts: [41.39, 29.39, -108.61, 150, 12]
      }
    },

    diaphragmLayout: [
      { position: "G1D1", section: "diaType1" },
      { position: "G1D2", section: "diaType1" },
      { position: "G1D3", section: "diaType1" },
      { position: "G1D4", section: "diaType1" },
      { position: "G1D5", section: "diaType1" },
      { position: "G1D6", section: "diaType1" },
      { position: "G1D7", section: "diaType1" },
      { position: "G1D8", section: "diaType1" },
      { position: "G1D9", section: "diaType1" },
      { position: "G1D10", section: "diaType1" },

      { position: "G2D1", section: "diaType1" },
      { position: "G2D2", section: "diaType1" },
      { position: "G2D3", section: "diaType1" },
      { position: "G2D4", section: "diaType1" },
      { position: "G2D5", section: "diaType1" },
      { position: "G2D6", section: "diaType1" },
      { position: "G2D7", section: "diaType1" },
      { position: "G2D8", section: "diaType1" },
      { position: "G2D9", section: "diaType1" },
      { position: "G2D10", section: "diaType1" },


      { position: "G1S1", section: "diaType2" },
      { position: "G1S2", section: "diaType2" },
      { position: "G1S3", section: "diaType2" },
      { position: "G2S1", section: "diaType2" },
      { position: "G2S2", section: "diaType2" },
      { position: "G2S3", section: "diaType2" },
    ],

    diaphragmSectionList: {
      diaType1: {
        lowerHeight: 250,
        lowerThickness: 12,
        lowerTopThickness: 10,
        lowerTopwidth: 100,
        upperThickness: 12,
        longiRibHeight: 150,
        longiRibRayout: [-125, 125],
        upperHeight: 220,
        sideHeight: 200,
        sideThickness: 14,
        leftsideTopwidth: 350,
        leftsideTopThickness: 12,
        leftsideToplength: 700,
        rightsideTopwidth: 220,
        rightsideTopThickness: 12,
        rightsideToplength: 80,
        upperTopThickness: 10,
        upperTopwidth: 150,
        // added variables
        scallopRadius: 35,
        ribHoleD: 42,
        ribHoleR: 25,
        //L100x100x10 section point, origin = (0,0)
        spc: 50,
        pts: [71.78, -18.22, -28.22, 10, 100] //단면중심축에 대한 정보포함된 L형 단면정보
      },
      diaType2: {
        plateThickness: 12,
        holeBottomOffset: 450,
        holeRightOffset: -314,
        holeFilletR: 100,
        holeHeight: 700,
        holeWidth: 450,
        vStiffThickness: 20,
        vStiffWidth: 420,
        vStiffLayout: [-125, 125],
        topPlateWidth: 520,
        topPlateThickness: 10,
        hStiffThickness: 12,
        hStiffWidth: 150,
        hStiffBottomOffset: 700,

        holeVstiffnerThickness: 10,
        holeVstiffnerhight: 100,
        holeVstiffnerLength: 860,
        holeHstiffnerThickness: 10,
        holeHstiffnerHeight: 100,
        holeHstiffnerLength: 610,
        holeStiffSpacing: 20,
        holeVstiffnerLength: 860,
        // added variables
        scallopRadius: 35
      }
    },

    vStiffLayout: [
      { position: "G1V2", section: "vStiffType1" },
      { position: "G1V4", section: "vStiffType1" },
      { position: "G1V5", section: "vStiffType1" },
      { position: "G1V6", section: "vStiffType1" },
      { position: "G1V7", section: "vStiffType1" },
      { position: "G1V8", section: "vStiffType1" },
      { position: "G1V9", section: "vStiffType1" },
      { position: "G1V10", section: "vStiffType1" },
      { position: "G1V11", section: "vStiffType1" },
      { position: "G1V12", section: "vStiffType1" },
      { position: "G2V2", section: "vStiffType1" },
      { position: "G2V4", section: "vStiffType1" },
      { position: "G2V5", section: "vStiffType1" },
      { position: "G2V6", section: "vStiffType1" },
      { position: "G2V7", section: "vStiffType1" },
      { position: "G2V8", section: "vStiffType1" },
      { position: "G2V9", section: "vStiffType1" },
      { position: "G2V10", section: "vStiffType1" },
      { position: "G2V11", section: "vStiffType1" },
      { position: "G2V12", section: "vStiffType1" },

    ],

    vStiffSectionList: {
      vStiffType1: {
        sideHeight: 200,
        sideThickness: 14,
        upperHeight: 220,
        bottomOffset: 60,
        // added variables
        scallopRadius: 35,
        sideScallopOffset: 20,
        //L100x100x10 section point, origin = (0,0)
        spc: 50,
        pts: [100, 10, 0, 10, 100] //단면중심축에 대한 정보포함된 L형 단면정보
      }
    },

    hBracingLayout: [
      { from: "G1S1", to: "G1V2", leftToright: true, section: "hBracingType1", platelayout: [false, false] },
      { from: "G1V2", to: "G1D1", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D1", to: "G1V4", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V4", to: "G1D2", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D2", to: "G1V5", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V5", to: "G1D3", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D3", to: "G1V6", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V6", to: "G1D4", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D4", to: "G1V7", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V7", to: "G1D5", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D5", to: "G1V8", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V8", to: "G1D6", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D6", to: "G1V9", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V9", to: "G1D7", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D7", to: "G1V10", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V10", to: "G1D8", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D8", to: "G1V11", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V11", to: "G1D9", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G1D9", to: "G1V12", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G1V12", to: "G1D10", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
    
      { from: "G2S1", to: "G2V2", leftToright: true, section: "hBracingType1", platelayout: [false, false] },
      { from: "G2V2", to: "G2D1", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D1", to: "G2V4", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V4", to: "G2D2", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D2", to: "G2V5", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V5", to: "G2D3", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D3", to: "G2V6", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V6", to: "G2D4", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D4", to: "G2V7", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V7", to: "G2D5", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D5", to: "G2V8", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V8", to: "G2D6", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D6", to: "G2V9", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V9", to: "G2D7", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D7", to: "G2V10", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V10", to: "G2D8", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D8", to: "G2V11", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V11", to: "G2D9", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
      { from: "G2D9", to: "G2V12", leftToright: true, section: "hBracingType1", platelayout: [false, true] },
      { from: "G2V12", to: "G2D10", leftToright: false, section: "hBracingType1", platelayout: [true, false] },
    ],




    hBracingSectionList: {
      hBracingType1: {
        upperHeight: 220,
        sideTopThickness: 14,
        sideToplength: 700,
        sideTopwidth: 300,
        // added variables
        scallopHeight: 200,
        scallopRadius: 25,
        scallopBottom: 42,
        //T150x150x6.5x9 section point, origin = (0,0)
        spc: 214,
        pts: [75, -75, -4.5, 4.5, -6.5, -150] //단면중심축에 대한 정보포함된 T형 단면정보 <-- L형하고 다름
      }
    },
  };
  const addedValues = {
    SlabInfo: [
      {
        Key: "start",
        A1: 1200,
        A2: 1200,
        Slab_thickness: 470,
        T1: 440,
        T2: 440,
        W1: 0,
        Haunch: 0,
        precast_overlap: 0,
        precast_added_weight: 0
      },
      {
        Key: "center",
        A1: 1200,
        A2: 1200,
        Slab_thickness: 270,
        T1: 240,
        T2: 240,
        W1: 0,
        Haunch: 0,
        precast_overlap: 0,
        precast_added_weight: 0
      },
      {
        Key: "end",
        A1: 1200,
        A2: 1200,
        Slab_thickness: 470,
        T1: 440,
        T2: 440,
        W1: 0,
        Haunch: 0,
        precast_overlap: 0,
        precast_added_weight: 0
      }
    ],

    supportFixed: true, //고정단중심경우 true, 접선방향의 경우 false
    supportData: [
      { point: "G1S1", type: "종방향가동", offset: 0 },
      { point: "G1S2", type: "종방향가동", offset: 0 },
      { point: "G1S3", type: "종방향가동", offset: 0 },
      // { point: "G1S4", type: "고정단", offset: 0 },
      // { point: "G1S5", type: "종방향가동", offset: 0 },
      // { point: "G1S6", type: "종방향가동", offset: 0 },
      // { point: "G1S7", type: "종방향가동", offset: -507},
      // { point: "G2S1", type: "양방향단", offset: 0 },
      // { point: "G2S2", type: "양방향단", offset: 0 },
      // { point: "G2S3", type: "양방향단", offset: 0 },
      // { point: "G2S4", type: "횡방향가동", offset: 0 },
      // { point: "G2S5", type: "양방향단", offset: 0 },
      // { point: "G2S6", type: "양방향단", offset: 0 },
      // { point: "G2S7", type: "양방향단", offset: -507},
    ],
    diaPhragmLocate:[
      {name : "G1D1", BenchMark : "G1S1", offset: 4450},
      {name : "G1D2", BenchMark : "G1S1", offset: 9450},
      {name : "G1D3", BenchMark : "G1S1", offset: 14450},
      {name : "G1D4", BenchMark : "G1S1", offset: 19450},
      {name : "G1D5", BenchMark : "G1S1", offset: 24450},
      {name : "G1D6", BenchMark : "G1S1", offset: 29450},
      {name : "G1D7", BenchMark : "G1S1", offset: 34450},
      {name : "G1D8", BenchMark : "G1S1", offset: 39450},
      {name : "G1D9", BenchMark : "G1S1", offset: 44450},
      {name : "G1D10", BenchMark : "G1S1", offset: 49450},
      {name : "G1D11", BenchMark : "G1S2", offset: 5000},
      {name : "G1D12", BenchMark : "G1S2", offset: 10000},
      {name : "G1D13", BenchMark : "G1S2", offset: 15000},
      {name : "G1D14", BenchMark : "G1S2", offset: 20000},
      {name : "G1D15", BenchMark : "G1S2", offset: 25000},
      {name : "G1D16", BenchMark : "G1S2", offset: 30000},
      {name : "G1D17", BenchMark : "G1S2", offset: 35000},
      {name : "G1D18", BenchMark : "G1S2", offset: 40000},
      {name : "G1D19", BenchMark : "G1S2", offset: 45000},
      {name : "G1D20", BenchMark : "G1S2", offset: 50000},
      {name : "G2D1", BenchMark : "G1S1", offset: 4450},
      {name : "G2D2", BenchMark : "G1S1", offset: 9450},
      {name : "G2D3", BenchMark : "G1S1", offset: 14450},
      {name : "G2D4", BenchMark : "G1S1", offset: 19450},
      {name : "G2D5", BenchMark : "G1S1", offset: 24450},
      {name : "G2D6", BenchMark : "G1S1", offset: 29450},
      {name : "G2D7", BenchMark : "G1S1", offset: 34450},
      {name : "G2D8", BenchMark : "G1S1", offset: 39450},
      {name : "G2D9", BenchMark : "G1S1", offset: 44450},
      {name : "G2D10", BenchMark : "G1S1", offset: 49450},
      {name : "G2D11", BenchMark : "G1S2", offset: 5000},
      {name : "G2D12", BenchMark : "G1S2", offset: 10000},
      {name : "G2D13", BenchMark : "G1S2", offset: 15000},
      {name : "G2D14", BenchMark : "G1S2", offset: 20000},
      {name : "G2D15", BenchMark : "G1S2", offset: 25000},
      {name : "G2D16", BenchMark : "G1S2", offset: 30000},
      {name : "G2D17", BenchMark : "G1S2", offset: 35000},
      {name : "G2D18", BenchMark : "G1S2", offset: 40000},
      {name : "G2D19", BenchMark : "G1S2", offset: 45000},
      {name : "G2D20", BenchMark : "G1S2", offset: 50000},

    ],
    vStiffLocate:[
      {name : "G1V1", BenchMark : "G1S1", offset: 1113},
      {name : "G1V2", BenchMark : "G1S1", offset: 2225},
      {name : "G1V3", BenchMark : "G1S1", offset: 3337},
      {name : "G1V4", BenchMark : "G1S1", offset: 6950},
      {name : "G1V5", BenchMark : "G1S1", offset: 11950},
      {name : "G1V6", BenchMark : "G1S1", offset: 16950},
      {name : "G1V7", BenchMark : "G1S1", offset: 21950},
      {name : "G1V8", BenchMark : "G1S1", offset: 26950},
      {name : "G1V9", BenchMark : "G1S1", offset: 31950},
      {name : "G1V10", BenchMark : "G1S1", offset: 36950},
      {name : "G1V11", BenchMark : "G1S1", offset: 41950},
      {name : "G1V12", BenchMark : "G1S1", offset: 46950},    
      {name : "G1V13", BenchMark : "G1S1", offset: 51950},    
      {name : "G1V14", BenchMark : "G1S2", offset: 25000},    
      {name : "G1V15", BenchMark : "G1S2", offset: 75000},    
      {name : "G1V16", BenchMark : "G1S2", offset: 125000},    
      {name : "G1V17", BenchMark : "G1S2", offset: 175000},    
      {name : "G1V18", BenchMark : "G1S2", offset: 225000},    
      {name : "G1V19", BenchMark : "G1S2", offset: 275000},    
      {name : "G1V20", BenchMark : "G1S2", offset: 325000},    
      {name : "G1V21", BenchMark : "G1S2", offset: 375000},    
      {name : "G1V22", BenchMark : "G1S2", offset: 425000},    
      {name : "G1V23", BenchMark : "G1S2", offset: 475000},    
      {name : "G1V24", BenchMark : "G1S2", offset: 525000},    
     
      {name : "G2V1", BenchMark : "G1S1", offset: 1113},
      {name : "G2V2", BenchMark : "G1S1", offset: 2225},
      {name : "G2V3", BenchMark : "G1S1", offset: 3337},
      {name : "G2V4", BenchMark : "G1S1", offset: 6950},
      {name : "G2V5", BenchMark : "G1S1", offset: 11950},
      {name : "G2V6", BenchMark : "G1S1", offset: 16950},
      {name : "G2V7", BenchMark : "G1S1", offset: 21950},
      {name : "G2V8", BenchMark : "G1S1", offset: 26950},
      {name : "G2V9", BenchMark : "G1S1", offset: 31950},
      {name : "G2V10", BenchMark : "G1S1", offset: 36950},
      {name : "G2V11", BenchMark : "G1S1", offset: 41950},
      {name : "G2V12", BenchMark : "G1S1", offset: 46950},    
      {name : "G2V13", BenchMark : "G1S1", offset: 51950},    
      {name : "G2V14", BenchMark : "G1S2", offset: 25000},    
      {name : "G2V15", BenchMark : "G1S2", offset: 75000},    
      {name : "G2V16", BenchMark : "G1S2", offset: 125000},    
      {name : "G2V17", BenchMark : "G1S2", offset: 175000},    
      {name : "G2V18", BenchMark : "G1S2", offset: 225000},    
      {name : "G2V19", BenchMark : "G1S2", offset: 275000},    
      {name : "G2V20", BenchMark : "G1S2", offset: 325000},    
      {name : "G2V21", BenchMark : "G1S2", offset: 375000},    
      {name : "G2V22", BenchMark : "G1S2", offset: 425000},    
      {name : "G2V23", BenchMark : "G1S2", offset: 475000},    
      {name : "G2V24", BenchMark : "G1S2", offset: 525000},    


    ],
    splice:[
      {name : "G1SP1", BenchMark : "G1S1", offset: 8200},
      {name : "G1SP2", BenchMark : "G1S1", offset: 18200},
      {name : "G1SP3", BenchMark : "G1S1", offset: 28200},
      {name : "G1SP4", BenchMark : "G1S1", offset: 38200},
      {name : "G1SP5", BenchMark : "G1S1", offset: 50700},
      {name : "G1SP6", BenchMark : "G1S1", offset: 58200},
      {name : "G2SP1", BenchMark : "G1S1", offset: 8200},
      {name : "G2SP2", BenchMark : "G1S1", offset: 18200},
      {name : "G2SP3", BenchMark : "G1S1", offset: 28200},
      {name : "G2SP4", BenchMark : "G1S1", offset: 38200},
      {name : "G2SP5", BenchMark : "G1S1", offset: 50700},
      {name : "G2SP6", BenchMark : "G1S1", offset: 58200},
    ],
    joint:[
      {name : "G1TF1", BenchMark : "G1V11", offset: 1250},
      {name : "G1BF1", BenchMark : "G1D1", offset: 1250},
    ],
    height:[
      {name : "G1H1", BenchMark : "G1S2", offset: -19500},
      {name : "G1H2", BenchMark : "G1S2", offset: -2500},
      {name : "G1H3", BenchMark : "G1S2", offset: 2500},
      {name : "G1H4", BenchMark : "G1S2", offset: 19500},
      {name : "G2H1", BenchMark : "G2S2", offset: -19500},
      {name : "G2H2", BenchMark : "G2S2", offset: -2500},
      {name : "G2H3", BenchMark : "G2S2", offset: 2500},
      {name : "G2H4", BenchMark : "G2S2", offset: 19500},
    ],
    taperedPoint:[
      {name : "G1T1", BenchMark : "G1S2", offset: -11250},
      {name : "G1T2", BenchMark : "G1S2", offset: -6450},
      {name : "G1T3", BenchMark : "G1S2", offset: 6450},
      {name : "G1T4", BenchMark : "G1S2", offset: 11250},
    ]
  };

  const {
    horizon,
    vertical,
    superElevation,
    girderLayoutInput,
    SEShape,
    girderBaseInfo,
    xbeamLayout,
    xbeamSectionList,
    diaphragmLayout,
    diaphragmSectionList,
    vStiffLayout,
    vStiffSectionList,
    hBracingLayout,
    hBracingSectionList
  } = defaultValues;

  const {
    SlabInfo,
    supportFixed,
    supportData,
    diaPhragmLocate,
    vStiffLocate,
    splice,
    joint,
    height,
    taperedPoint,  
  } = addedValues;

  function HorizonInput(){
    this.addOutput("horizon","horizon");
  }
  HorizonInput.prototype.onExecute = function() {
    this.setOutputData(0,horizon);
  };
  global.LiteGraph.registerNodeType("HMInput/Horizon", HorizonInput);

  function VerticalInput(){
    this.addOutput("vertical","vertical");
  }
  VerticalInput.prototype.onExecute = function() {
    this.setOutputData(0,vertical);
  };
  global.LiteGraph.registerNodeType("HMInput/vertical", VerticalInput);

  function SuperElevationInput(){
    this.addOutput("superElevation","superElevation");
  }
  SuperElevationInput.prototype.onExecute = function() {
    this.setOutputData(0,superElevation);
  };
  global.LiteGraph.registerNodeType("HMInput/superElevation", SuperElevationInput);


  function GirderLayoutInput(){
    this.addOutput("girderLayoutInput","girderLayoutInput");
  }
  GirderLayoutInput.prototype.onExecute = function() {
    this.setOutputData(0,girderLayoutInput);
  };
  global.LiteGraph.registerNodeType("HMInput/girderLayoutInput", GirderLayoutInput);

  function SEShapeInput(){
    this.addOutput("SEShape","SEShape");
  }
  SEShapeInput.prototype.onExecute = function() {
    this.setOutputData(0,SEShape);
  };
  global.LiteGraph.registerNodeType("HMInput/SEShape", SEShapeInput);

  function GirderBaseInfo(){
    this.addOutput("girderBaseInfo","girderBaseInfo");
  }
  GirderBaseInfo.prototype.onExecute = function() {
    this.setOutputData(0,girderBaseInfo);
  };
  global.LiteGraph.registerNodeType("HMInput/girderBaseInfo", GirderBaseInfo);


  function DiaphragmInput(){
    this.addOutput("diaphragmLayout","diaphragmLayout");
    this.addOutput("diaphragmSectionList","diaphragmSectionList");
  }
  DiaphragmInput.prototype.onExecute = function() {
    this.setOutputData(0,diaphragmLayout);
    this.setOutputData(1,diaphragmSectionList);
  };
  global.LiteGraph.registerNodeType("HMInput/diaphragmInput", DiaphragmInput);

  function VStiffInput(){
    this.addOutput("vStiffLayout","vStiffLayout");
    this.addOutput("vStiffSectionList","vStiffSectionList");
  }
  VStiffInput.prototype.onExecute = function() {
    this.setOutputData(0,vStiffLayout);
    this.setOutputData(1,vStiffSectionList);
  };
  global.LiteGraph.registerNodeType("HMInput/vStiffInput", VStiffInput);



  function GridPointInput(){
    this.addOutput("diaPhragmLocate","diaPhragmLocate");
    this.addOutput("vStiffLocate","vStiffLocate");
    this.addOutput("splice","splice");
    this.addOutput("joint","joint");
    this.addOutput("height","height");
    this.addOutput("taperedPoint","taperedPoint");
  }
  GridPointInput.prototype.onExecute = function() {
    this.setOutputData(0,diaPhragmLocate);
    this.setOutputData(1,vStiffLocate);
    this.setOutputData(2,splice);
    this.setOutputData(3,joint);
    this.setOutputData(4,height);
    this.setOutputData(5,taperedPoint);
  };
  global.LiteGraph.registerNodeType("HMInput/gridPointInput", GridPointInput);
  //git

  const MasterLineData = (horizon, VerticalDataList, superElevation, beginStation) => {
    let lineResult = LineGenerator2(horizon, beginStation);
    let parabolaData = [];
    let tangent = [];
    for (let i = 0; i < VerticalDataList.length - 1; i++) {
      tangent.push((VerticalDataList[i + 1][1] - VerticalDataList[i][1]) /
        (VerticalDataList[i + 1][0] - VerticalDataList[i][0]));
    }
    for (let i = 0; i < VerticalDataList.length - 2; i++) {
      let parabola1 = VerticalDataList[i + 1][0] - VerticalDataList[i + 1][2] / 2;
      let parabola2 = VerticalDataList[i + 1][0] + VerticalDataList[i + 1][2] / 2;
      parabolaData.push([
        parabola1,
        parabola2,
        VerticalDataList[i][1] + tangent[i] * (parabola1 - VerticalDataList[i][0]),
        VerticalDataList[i + 1][1] + tangent[i + 1] * (parabola2 - VerticalDataList[i + 1][0]),
        VerticalDataList[i + 1][2]
      ]);
    }
    lineResult.tangent = tangent;
    lineResult.parabolaData = parabolaData;
    lineResult.VerticalDataList = VerticalDataList;
    lineResult.SuperElevation = superElevation;
    lineResult.HorizonDataList = horizon;
    lineResult.points = [];
    const spacing = 10000;
    for (let i = Math.ceil(lineResult.beginStationNumber / spacing) * spacing; i < lineResult.endStationNumber; i += spacing) {
      lineResult.points.push(MasterPointGenerator(i, lineResult));
    }
    
    return lineResult
  };

  const LineGenerator2 = (horizonDataList,beginStation) => {
    // console.time("for loop");
    let lineResult = {
      vectors: [],
      curves: [],
      segments: { start: [], end: [] },
      beginStationNumber: 0,
      endStationNumber: 0,
      startPoint: [],
    };
    for (let i = 0; i < horizonDataList.length - 1; i++) {
      lineResult.startPoint.push(_.take(horizonDataList[i], 2));
      lineResult.vectors.push(
        Vector2d([
          _.take(horizonDataList[i], 2),
          _.take(horizonDataList[i + 1], 2)
        ])
      );
    }

    for (let i = 0; i < horizonDataList.length - 2; i++) {
      lineResult.curves.push(
        Curve(
          _.take(horizonDataList[i], 2),
          lineResult.vectors[i],
          lineResult.vectors[i + 1],
          horizonDataList[i + 1][2],
          horizonDataList[i + 1][3],
          horizonDataList[i + 1][4],
        )
      );
    }
    let segmentsStation = beginStation;
    lineResult.segments.start.push(segmentsStation);
    for (let j = 0; j < (horizonDataList.length - 2); j++) {
      if (j === 0) {
        segmentsStation += lineResult.vectors[j].length - lineResult.curves[j].beginOffset; //초기값은 항상 직선으로 시작
        lineResult.segments.start.push(segmentsStation);
      } else {
        segmentsStation += lineResult.vectors[j].length - lineResult.curves[j].beginOffset - lineResult.curves[j - 1].endOffset;
        lineResult.segments.start.push(segmentsStation);
      }
      segmentsStation += lineResult.curves[j].beginClothoid.length;
      lineResult.segments.start.push(segmentsStation);
      segmentsStation += lineResult.curves[j].arcAngle * lineResult.curves[j].arcRadius;
      lineResult.segments.start.push(segmentsStation);
      segmentsStation += lineResult.curves[j].endClothoid.length;
      lineResult.segments.start.push(segmentsStation);
    }
    lineResult.segments.end.push(..._.drop(lineResult.segments.start));
    if (lineResult.curves.length === 0) {
      segmentsStation += lineResult.vectors[lineResult.vectors.length - 1].length;
    } else {
      segmentsStation += lineResult.vectors[lineResult.vectors.length - 1].length - lineResult.curves[lineResult.curves.length - 1].endOffset;
    }
    lineResult.segments.end.push(segmentsStation);
    lineResult.beginStationNumber = lineResult.segments.start[0];
    lineResult.endStationNumber = lineResult.segments.end[lineResult.segments.end.length - 1];
    return lineResult;
  };

  const MasterPointGenerator = (station, Masterline,skew) => {
    let resultPoint = {
      x: 0,
      y: 0,
      z: 0,
      normalCos: 0,
      normalSin: 0,
      masterStationNumber: station.toFixed(4) * 1,
      virtual: false,
      gradientX:0,
      leftGradient:0,
      rightGradient:0,
      skew: skew? skew: 90,
    };
    // const dataList = Masterline.input.horizonDataList;
    const startStationNumList = Masterline.segments.start;
    const endStationNumList = Masterline.segments.end;
    
    let gradX =0;
    let leftG =0;
    let rightG = 0;

    let l = 0;
    let lineNum = 0;
    let varCase = 0;
    const startPoint = Masterline.startPoint;
    let tempRes = [0, 0, 0, 0];

    for (let i = 0; i < startStationNumList.length;i++) { //= 4 * (dataList.length - 2); i++) {
      l = station - startStationNumList[i];

      lineNum = Math.floor(i / 4);
      varCase = i % 4;
      if (
        station >= startStationNumList[i] &&
        station <= endStationNumList[i]
      ) {
        switch (varCase) {
          case 0:
            if (i === 0) { // if datalist.length === 2point, this is not available, || (dataList[lineNum][2] === 0 && dataList[lineNum - 1][2] === 0 && dataList[lineNum + 1][2] === 0 )) {
              tempRes[0] = startPoint[lineNum][0] + l * Masterline.vectors[lineNum].cos;
              tempRes[1] = startPoint[lineNum][1] + l * Masterline.vectors[lineNum].sin;
            } else {
              tempRes[0] = Masterline.curves[lineNum - 1].endClothoidCoord[0] + l * Masterline.vectors[lineNum].cos;
              tempRes[1] = Masterline.curves[lineNum - 1].endClothoidCoord[1] + l * Masterline.vectors[lineNum].sin;
            }
            tempRes[2] = Masterline.vectors[lineNum].sin;
            tempRes[3] = -1 * Masterline.vectors[lineNum].cos;
            break;
          case 1:
            tempRes = Masterline.curves[lineNum].beginClothoidStation(l);
            break;
          case 2:
            tempRes = Masterline.curves[lineNum].arcStation(l);
            break;
          case 3:
            tempRes = Masterline.curves[lineNum].endClothoidStation(l);
            break;
        }
        resultPoint.x = tempRes[0];
        resultPoint.y = tempRes[1];
        resultPoint.normalCos = tempRes[2];
        resultPoint.normalSin = tempRes[3];
        break;
      }
    }
    if (station <= Masterline.VerticalDataList[0][0]) {
      resultPoint.z = Masterline.VerticalDataList[0][1] + Masterline.tangent[0] * (station - Masterline.VerticalDataList[0][0]);
      gradX = Masterline.tangent[0];
    } else if (station >= Masterline.VerticalDataList[Masterline.VerticalDataList.length - 1][0]) {
      resultPoint.z = Masterline.VerticalDataList[Masterline.VerticalDataList.length - 1][1] + Masterline.tangent[Masterline.tangent.length - 1] * (station - Masterline.VerticalDataList[Masterline.VerticalDataList.length - 1][0]);
      gradX = Masterline.tangent[Masterline.tangent.length - 1];
    } else {
      for (let i = 0; i < Masterline.VerticalDataList.length - 1; i++) {
        if (station >= Masterline.VerticalDataList[i][0] && station < Masterline.VerticalDataList[i + 1][0]) {
          resultPoint.z = Masterline.VerticalDataList[i][1] + Masterline.tangent[i] * (station - Masterline.VerticalDataList[i][0]);
          gradX = Masterline.tangent[i];
        }
      }
      for (let i = 0; i < Masterline.VerticalDataList.length - 2; i++) {
        if (station >= Masterline.parabolaData[i][0] && station <= Masterline.parabolaData[i][1]) {
          resultPoint.z = Masterline.parabolaData[i][2] +
          Masterline.tangent[i] * (station - Masterline.parabolaData[i][0]) +
            (Masterline.tangent[i + 1] - Masterline.tangent[i]) / 2 / Masterline.parabolaData[i][4] * (station - Masterline.parabolaData[i][0]) ** 2;
          gradX = Masterline.tangent[i] + (Masterline.tangent[i + 1] - Masterline.tangent[i]) / Masterline.parabolaData[i][4] * (station - Masterline.parabolaData[i][0]);
        }
      }
    }
    if (station <= Masterline.SuperElevation[0][0]) {
        leftG = -Masterline.SuperElevation[0][1];
        rightG = Masterline.SuperElevation[0][2];
    } else if (station >= Masterline.SuperElevation[Masterline.SuperElevation.length - 1][0]) {
        leftG = -Masterline.SuperElevation[Masterline.SuperElevation.length - 1][1];
        rightG = Masterline.SuperElevation[Masterline.SuperElevation.length - 1][2];
    } else {
      for (let i = 0; i < Masterline.SuperElevation.length - 1; i++) {
        if (station >= Masterline.SuperElevation[i][0] && station < Masterline.SuperElevation[i + 1][0]) {
            leftG = -((station - Masterline.SuperElevation[i][0]) / (Masterline.SuperElevation[i + 1][0] - Masterline.SuperElevation[i][0])
              * (Masterline.SuperElevation[i + 1][1] - Masterline.SuperElevation[i][1]) + Masterline.SuperElevation[i][1]);
            rightG = ((station - Masterline.SuperElevation[i][0]) / (Masterline.SuperElevation[i + 1][0] - Masterline.SuperElevation[i][0])
              * (Masterline.SuperElevation[i + 1][2] - Masterline.SuperElevation[i][2]) + Masterline.SuperElevation[i][2]);
        }
      }
    }

    resultPoint.gradientX = gradX;
    resultPoint.leftGradient = leftG/100;
    resultPoint.rightGradient = rightG/100;
    return resultPoint;
  };

  function Vector2d(xydata) {
    let vectorX = xydata[1][0] - xydata[0][0];
    let vectorY = xydata[1][1] - xydata[0][1];
    let vector = [vectorX, vectorY];
    let length = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
    let cos = vectorX / length;
    let sin = vectorY / length;
    return { vector, length, cos, sin }
  }


  function Curve(startPoint, vector1, vector2, radius, a1, a2) {
    if (radius !== 0) {
        // let vector1 = Vector2d(xydata1);
        // let vector2 = Vector2d(xydata2);
        let angle = Math.acos((vector1.vector[0] * vector2.vector[0] + vector1.vector[1] * vector2.vector[1]) / (vector1.length * vector2.length));
        let arcRadius = radius;
        let aBegin = a1;
        let aEnd = a2;

        let sign = 0;

        if ((-1 * vector2.cos * vector1.sin + vector2.sin * vector1.cos) > 0) {
            sign = 1;    // Counter clockwise
        }
        else {
            sign = -1;   // Clockwise
        }

        let beginClothoid = Clothoid(radius, a1);
        let endClothoid = Clothoid(radius, a2);
        let arcAngle = angle - beginClothoid.angle - endClothoid.angle;

        let beginOffset = beginClothoid.radiusCenterOffset + radius * Math.tan(angle / 2) +
            endClothoid.offset / Math.sin(angle) - beginClothoid.offset / Math.tan(angle);

        let endOffset = endClothoid.radiusCenterOffset + radius * Math.tan(angle / 2) +
            beginClothoid.offset / Math.sin(angle) - endClothoid.offset / Math.tan(angle);

        let beginClothoidCoord = [startPoint[0] + (vector1.length - beginOffset) * vector1.cos,
        startPoint[1] + (vector1.length - beginOffset) * vector1.sin];

        let beginArcCoord = [beginClothoidCoord[0] + beginClothoid.totalX * vector1.cos - sign * beginClothoid.totalY * vector1.sin,
        beginClothoidCoord[1] + beginClothoid.totalX * vector1.sin + sign * beginClothoid.totalY * vector1.cos];

        let arcCenter = [beginClothoidCoord[0] + beginClothoid.radiusCenterOffset * vector1.cos - sign * (radius + beginClothoid.offset) * vector1.sin,
        beginClothoidCoord[1] + beginClothoid.radiusCenterOffset * vector1.sin + sign * (radius + beginClothoid.offset) * vector1.cos];

        let endArcCoord = [arcCenter[0] + (beginArcCoord[0] - arcCenter[0]) * Math.cos(arcAngle) - sign * (beginArcCoord[1] - arcCenter[1]) * Math.sin(arcAngle),
        arcCenter[1] + (beginArcCoord[1] - arcCenter[1]) * Math.cos(arcAngle) + sign * (beginArcCoord[0] - arcCenter[0]) * Math.sin(arcAngle)];

        let endClothoidCoord = [endArcCoord[0] + endClothoid.totalX * vector2.cos + sign * endClothoid.totalY * vector2.sin,
        endArcCoord[1] + endClothoid.totalX * vector2.sin - sign * endClothoid.totalY * vector2.cos];

        function beginClothoidStation(l) {
            let clothoidX = l * (1 - l ** 4 / 40 / aBegin ** 4 + l ** 8 / 3456 / aBegin ** 8);
            let clothoidY = l ** 3 / 6 / aBegin ** 2 * (1 - l ** 4 / 56 / aBegin ** 4 + l ** 8 / 7040 / aBegin ** 8);
            let resultX = beginClothoidCoord[0] + vector1.cos * clothoidX - sign * vector1.sin * clothoidY;
            let resultY = beginClothoidCoord[1] + vector1.sin * clothoidX + sign * vector1.cos * clothoidY;
            let slopeDeltaX = (1 - l ** 4 * 5 / 40 / aBegin ** 4 + l ** 8 * 9 / 3456 / aBegin ** 8);
            let slopeDeltaY = l ** 2 / 6 / aBegin ** 2 * (3 - l ** 4 * 7 / 56 / aBegin ** 4 + l ** 8 * 11 / 7040 / aBegin ** 8);
            let slopeLength = Math.sqrt(slopeDeltaX ** 2 + slopeDeltaY ** 2);
            let normalCos = sign * slopeDeltaY / slopeLength;
            let normalSin = -1 * slopeDeltaX / slopeLength;
            let globalNormalCos = vector1.cos * normalCos - vector1.sin * normalSin;
            let globalNormalSin = vector1.sin * normalCos + vector1.cos * normalSin;
            return [resultX, resultY, globalNormalCos, globalNormalSin]
        }

        function endClothoidStation(l) {
            l = endClothoid.length - l;
            let clothoidX = endClothoid.totalX - (l * (1 - l ** 4 / 40 / aEnd ** 4 + l ** 8 / 3456 / aEnd ** 8));
            let clothoidY = -1 * endClothoid.totalY + (l ** 3 / 6 / aEnd ** 2 * (1 - l ** 4 / 56 / aEnd ** 4 + l ** 8 / 7040 / aEnd ** 8));
            let resultX = endArcCoord[0] + vector2.cos * clothoidX - sign * vector2.sin * clothoidY;
            let resultY = endArcCoord[1] + vector2.sin * clothoidX + sign * vector2.cos * clothoidY;
            let slopeDeltaX = -1 * (1 - l ** 4 * 5 / 40 / aEnd ** 4 + l ** 8 * 9 / 3456 / aEnd ** 8);
            let slopeDeltaY = l ** 2 / 6 / aEnd ** 2 * (3 - l ** 4 * 7 / 56 / aEnd ** 4 + l ** 8 * 11 / 7040 / aEnd ** 8);
            let slopeLength = Math.sqrt(slopeDeltaX ** 2 + slopeDeltaY ** 2);
            let normalCos = -sign * slopeDeltaY / slopeLength;
            let normalSin = slopeDeltaX / slopeLength;
            let globalNormalCos = vector2.cos * normalCos - vector2.sin * normalSin;
            let globalNormalSin = vector2.sin * normalCos + vector2.cos * normalSin;
            return [resultX, resultY, globalNormalCos, globalNormalSin]
        }

        function arcStation(l) {
            let resultX = arcCenter[0] + (beginArcCoord[0] - arcCenter[0]) * Math.cos(l / arcRadius) - sign * (beginArcCoord[1] - arcCenter[1]) * Math.sin(l / arcRadius);
            let resultY = arcCenter[1] + (beginArcCoord[1] - arcCenter[1]) * Math.cos(l / arcRadius) + sign * (beginArcCoord[0] - arcCenter[0]) * Math.sin(l / arcRadius);
            let globalNormalCos = sign * (resultX - arcCenter[0]) / arcRadius;
            let globalNormalSin = sign * (resultY - arcCenter[1]) / arcRadius;
            return [resultX, resultY, globalNormalCos, globalNormalSin]
        }

        let result = {
            angle, arcRadius, a1, a2, beginClothoid, endClothoid, arcAngle, beginOffset, endOffset, beginClothoidCoord, beginArcCoord,
            arcCenter, endArcCoord, endClothoidCoord, beginClothoidStation, endClothoidStation, arcStation, sign
        };
        return result
    }
    else {
        let angle = 0;
        let beginClothoid = Clothoid(radius, a1);
        let endClothoid = Clothoid(radius, a2);
        let arcRadius = 0;
        let arcAngle = 0;
        let beginOffset = 0;
        let endOffset = 0;
        let beginClothoidCoord = 0;
        let beginArcCoord = 0;
        let arcCenter = 0;
        let endArcCoord = 0;
        let endClothoidCoord = 0;

        let result = {
            angle, arcRadius, a1, a2, beginClothoid, endClothoid, arcAngle, beginOffset, endOffset, beginClothoidCoord, beginArcCoord,
            arcCenter, endArcCoord, endClothoidCoord
        };
        return result
    }

  }


  function Clothoid(radius, a) {
    if (radius !== 0) {
        let length = Math.pow(a, 2) / radius;
        let angle = Math.pow(a, 2) / Math.pow(radius, 2) / 2;
        let totalX = length * (1 - Math.pow(length, 2) / 40 / Math.pow(radius, 2) + Math.pow(length, 4) / 3456 / Math.pow(radius, 4));
        let totalY = Math.pow(length, 2) / 6 / radius * (1 - Math.pow(length, 2) / 56 / Math.pow(radius, 2) + Math.pow(length, 4) / 7040 / Math.pow(radius, 4));
        let offset = totalY - radius * (1 - Math.cos(angle));
        let radiusCenterOffset = totalX - radius * Math.sin(angle);

        let result = { length, angle, totalX, totalY, offset, radiusCenterOffset };
        return result
    }
    else {
        let length = 0;
        let angle = 0;
        let totalX = 0;
        let totalY = 0;
        let offset = 0;
        let radiusCenterOffset = 0;
        let result = { length, angle, totalX, totalY, offset, radiusCenterOffset };
        return result
    }
  }

  function OffsetLine(offset, line, startPoint, endPoint){
   
    let points = [];
    let st = 0;
    let ed = 0;
    let offsetPoint = {};
     for (let i = 0; i < line.points.length; i++) {
      //  let zOffset = offset > 0? line.points[i].rightGradient * offset : line.points[i].leftGradient * offset
      offsetPoint = {
        // stationNumber: line.points[i].masterStationNumber,
        x: line.points[i].x + line.points[i].normalCos * offset,
        y: line.points[i].y + line.points[i].normalSin * offset,
        // z: 0, //line.points[i].z +  zOffset,
        normalCos: line.points[i].normalCos,
        normalSin: line.points[i].normalSin,
        // masterStationNumber: line.points[i].masterStationNumber,
        // skew: line.points[i].skew,
        // offset: offset,
        // virtual: false
      };
      st = startPoint.normalSin * (offsetPoint.x - startPoint.x) - startPoint.normalCos * (offsetPoint.y - startPoint.y);
      ed = endPoint.normalSin * (offsetPoint.x - endPoint.x) - endPoint.normalCos * (offsetPoint.y - endPoint.y);
      
      if (st*ed <=0){
        
       points.push(offsetPoint);
      }
    }
    return points
  }

  const PointLineMatch2 = (targetPoint, masterLine) => {
    let resultPoint = {};
    let point1 = {};
    let point2 = {};
    let crossproduct1 = 0;
    let crossproduct2 = 0;
    let innerproduct = 1;
    let station1 = 0;
    let station2 = 0;
    let station3 = 0;
    const err = 0.1;
    let num_iter = 0;
    let a = true;

    //matser_segment = variables.Segment_station_number(master_line_datalist)

    for (let i = 0; i < masterLine.segments.start.length; i++) {
      station1 = masterLine.segments.start[i];
      station2 = masterLine.segments.end[i];
      point1 = PointGenerator(station1, masterLine, 90);
      point2 = PointGenerator(station2, masterLine, 90);
      crossproduct1 = (targetPoint.x - point1.x) * point1.normalSin - (targetPoint.y - point1.y) * point1.normalCos;
      crossproduct2 = (targetPoint.x - point2.x) * point2.normalSin - (targetPoint.y - point2.y) * point2.normalCos;

      if (crossproduct1 * crossproduct2 < 0) {
        a = false;
        break;
      } else if (Math.abs(crossproduct1) < err) {
        resultPoint = { ...point1 };
        break;
      } else if (Math.abs(crossproduct2) < err) {
        resultPoint = { ...point2 };
        break;
      }
    }
    if (a == false) {
      while (Math.abs(innerproduct) > err) {
        innerproduct = (targetPoint.x - point1.x) * (-point1.normalSin) + (targetPoint.y - point1.y) * (point1.normalCos);
        station3 = station1 + innerproduct;
        point1 = PointGenerator(station3, masterLine, 90);
        station1 = point1.stationNumber;
        crossproduct1 = (targetPoint.x - point1.x) * point1.normalSin - (targetPoint.y - point1.y) * point1.normalCos;
        resultPoint = { ...point1 };
        num_iter += 1;
        if (num_iter == 200) {
          break;
        }
      }
    }  const MasterPoint = MasterPointGenerator(resultPoint.stationNumber,masterLine);
    //targetPoint.master_station_number = result.station_number
    return MasterPoint
  };

  const PointGenerator = (stationNumber, line, skew) => {
    let resultPoint = {
      stationNumber: stationNumber.toFixed(4) * 1,
      x: 0,
      y: 0,
      z: 0,
      normalCos: 0,
      normalSin: 0,
      masterStationNumber: stationNumber,
      offset: 0,
      virtual: false,
      skew: skew,
    };
    // const dataList = line.input.horizonDataList;
    const startStationNumList = line.segments.start;
    const endStationNumList = line.segments.end;

    let l = 0;
    let lineNum = 0;
    let varCase = 0;
    const startPoint = line.startPoint;
    let tempRes = [0, 0, 0, 0];

    for (let i = 0; i < startStationNumList.length;i++){  // }= 4 * (dataList.length - 2); i++) {
      l = stationNumber - startStationNumList[i];

      lineNum = Math.floor(i / 4);
      varCase = i % 4;
      if (
        stationNumber >= startStationNumList[i] &&
        stationNumber <= endStationNumList[i]
      ) {
        switch (varCase) {
          case 0:
            if (i === 0) { // if datalist.length === 2point, this is not available, || (dataList[lineNum][2] === 0 && dataList[lineNum - 1][2] === 0 && dataList[lineNum + 1][2] === 0 )) {
              tempRes[0] = startPoint[lineNum][0] + l * line.vectors[lineNum].cos;
              tempRes[1] = startPoint[lineNum][1] + l * line.vectors[lineNum].sin;
            } else {
              tempRes[0] = line.curves[lineNum - 1].endClothoidCoord[0] + l * line.vectors[lineNum].cos;
              tempRes[1] = line.curves[lineNum - 1].endClothoidCoord[1] + l * line.vectors[lineNum].sin;
            }
            tempRes[2] = line.vectors[lineNum].sin;
            tempRes[3] = -1 * line.vectors[lineNum].cos;
            break;
          case 1:
            tempRes = line.curves[lineNum].beginClothoidStation(l);
            break;
          case 2:
            tempRes = line.curves[lineNum].arcStation(l);
            break;
          case 3:
            tempRes = line.curves[lineNum].endClothoidStation(l);
            break;
        }
        resultPoint.x = tempRes[0];
        resultPoint.y = tempRes[1];
        resultPoint.normalCos = tempRes[2];
        resultPoint.normalSin = tempRes[3];
        break;
      }
    }
    return resultPoint;
  };

  const OffsetPoint = (masterPoint,masterLine,offset) => {
      let resultPoint = {
        x: 0,
        y: 0,
        z: 0,
        normalCos: 0,
        normalSin: 0,
        masterStationNumber: 0,
        gradientX:masterPoint.gradientX,
        gradientY: 0,
        skew:masterPoint.skew,
        offset:offset
      };
      if (masterPoint.skew === 90){
        resultPoint.x =  masterPoint.x + masterPoint.normalCos * offset;
        resultPoint.y = masterPoint.y + masterPoint.normalSin * offset;
        resultPoint.normalCos =  masterPoint.normalCos;
        resultPoint.normalSin = masterPoint.normalSin;
        resultPoint.masterStationNumber = masterPoint.masterStationNumber;
        resultPoint.gradientY = offset>0? masterPoint.rightGradient:masterPoint.leftGradient;
        resultPoint.z = masterPoint.z + resultPoint.gradientY * offset;
      } else {
        let skewRad = (masterPoint.skew-90)*Math.PI/180;
        let cos = Math.cos(skewRad); //반시계방향으로 회전
        let sin = Math.sin(skewRad);
        let skewCos = masterPoint.normalCos*cos - masterPoint.normalSin*sin;
        let skewSin = masterPoint.normalCos*sin + masterPoint.normalSin*cos;
        let skewC = masterPoint.x * skewSin - masterPoint.y * skewCos;
        let newP = {};
        let x = 0;
        let y=0;
        let delta = 0;
        let dist = 0;
        let ms = masterPoint.masterStationNumber+Math.tan(skewRad)*offset;
        for (let i=0;i<30;i++){
          newP = MasterPointGenerator(ms,masterLine);
          let newCos = newP.normalCos;
          let newSin = newP.normalSin;
          let newC = newP.x * newSin - newP.y * newCos;
          let sign = offset>0?1:-1;
          x = (skewCos*newC - newCos * skewC)/(skewCos *newSin - skewSin * newCos);
          y = (skewSin*newC - newSin * skewC)/(skewCos *newSin - skewSin * newCos);
          dist = Math.sqrt((newP.x - x)**2 + (newP.y - y)**2);
          if (Math.abs(Math.abs(offset) - dist) < 0.1){
            break;
          }else {
            let icos = newCos*skewCos + newSin*skewSin;
            let isin = Math.sqrt(1-icos**2);
            delta = sign*(dist - Math.abs(offset))*isin/icos; //추후 검토가 필요함
            if (skewRad > 0){ms -= delta;} else {ms += delta;}
          }
        }
        
        resultPoint.x =  x;
        resultPoint.y = y;
        resultPoint.normalCos =  newP.normalCos;
        resultPoint.normalSin = newP.normalSin;
        resultPoint.masterStationNumber = newP.masterStationNumber;
        resultPoint.gradientY = offset>0? newP.rightGradient:newP.leftGradient;
        resultPoint.z = newP.z + resultPoint.gradientY * offset;
      }
      return resultPoint
    };

  // import { LiteGraph, THREE, sceneAdder } from "global";

  function MasterLine(){
    this.addInput("horizon","arr");
    this.addInput("vertical","arr");
    this.addInput("superElevation","arr");
    this.addInput("beginStation","number");
    // this.addInput("slaveOrMaster","boolean");
    this.addOutput("points","points");
    this.addOutput("line","line");
  }
  MasterLine.prototype.onExecute = function() {

    const horizonDataList = this.getInputData(0);
    const verticalDataList = this.getInputData(1);
    const superElevation = this.getInputData(2);
    const beginStation = this.getInputData(3); //769452.42;
    let line = MasterLineData(horizonDataList,verticalDataList,superElevation,beginStation);
    this.points= line.points;
    this.setOutputData(0,line.points);
    this.setOutputData(1,line);
  };

  // MasterLine.prototype.on3DExecute = function() {
  //   let initPoint = { x: 178341809.1588868,
  //                     y: 552237726.8852764,
  //                     z: 26934.34284538262}
  //   let mesh = LineToThree(this.points,initPoint)
  //   sceneAdder({id:0,mesh:mesh});
  // };

  function GirderLayoutGenerator2(masterLine, slaveLine, girderLayoutInput) {
    const angle = 0;
    const spanLength = 1;
    const baseLine = 0;
    const alignOffset = 1;
    const margin = 12000; // 해당변수로 충분한 거더 간격이 포함되어야 함.

    let result = {
      masterLine: masterLine,
      startPoint: {},
      endPoint: {},
      girderLine: [],
      gridKeyPoint: {}
    };
    let supportStation = girderLayoutInput.baseValue;
    let bridgeLength = 0;
    let i = 0;
    girderLayoutInput.supportData.forEach(function (elem) {
      bridgeLength += elem[spanLength] ? elem[spanLength] : 0;
      let gridName = "CRS" + i;
      result.gridKeyPoint[gridName] = MasterPointGenerator(supportStation + bridgeLength, masterLine, elem[angle]);
      if (i === 0) {
        result.startPoint = result.gridKeyPoint[gridName];
      } else if (i === girderLayoutInput.supportData.length - 1) {
        result.endPoint = result.gridKeyPoint[gridName];
      }
      i++;
    });
    // 시종점 교대사각 자동계산 //
    result.gridKeyPoint["CRS" + 1].skew = OffsetSkewCalculator(result.startPoint, result.startPoint.skew, girderLayoutInput.supportData[1][1], masterLine);
    result.gridKeyPoint["CRS" + (girderLayoutInput.supportData.length - 2)].skew = OffsetSkewCalculator(result.endPoint, result.endPoint.skew, -1 * girderLayoutInput.supportData[girderLayoutInput.supportData.length - 1][1], masterLine);
    // 시종점 교대사각 자동계산 끝 //
    let stp = MasterPointGenerator(result.startPoint.masterStationNumber - margin, masterLine, result.startPoint.skew);
    let edp = MasterPointGenerator(result.endPoint.masterStationNumber + margin, masterLine, result.startPoint.skew);

    for (let j = 0; j < girderLayoutInput.getGirderList.length; j++) {
      let girderBaseLine = girderLayoutInput.getGirderList[j][baseLine] === "MasterLine" ? masterLine : slaveLine[girderLayoutInput.getGirderList[j][baseLine]];
      result.girderLine.push(OffsetLine(girderLayoutInput.getGirderList[j][alignOffset], girderBaseLine, stp, edp));
      // 추후에 거더라인이 포인트만 가져간다고 하면, 포인트에대한 내용만 보내줄것!
    }

    return result
  }


  function GridPointGenerator3(girderLayout, SEShape, gridInput) {
    let masterLine = girderLayout.masterLine;
    let nameToPointDict = {};
    const girderNumber = girderLayout.girderLine.length;
    let pointName = "";
    let offset = 0;
    for (let k = 0; k < 8; k++) {
      switch (k) {
        case 0: offset = SEShape.start.A; break;
        case 1: offset = SEShape.start.A + SEShape.start.D; break;
        case 2: offset = SEShape.start.A + SEShape.start.D + SEShape.start.F; break;
        case 3: offset = SEShape.start.A + SEShape.start.D + SEShape.start.F + SEShape.start.G; break;
        case 4: offset = -(SEShape.end.A + SEShape.end.D + SEShape.end.F + SEShape.end.G); break;
        case 5: offset = -(SEShape.end.A + SEShape.end.D + SEShape.end.F); break;
        case 6: offset = -(SEShape.end.A + SEShape.end.D); break;
        case 7: offset = -(SEShape.end.A); break;
      }
      let masterPoint = k < 4 ? girderLayout.startPoint : girderLayout.endPoint;
      let skew = k < 4 ? OffsetSkewCalculator(masterPoint, girderLayout.startPoint.skew, offset, masterLine) : OffsetSkewCalculator(masterPoint, girderLayout.endPoint.skew, offset, masterLine);
      let centerPoint = MasterPointGenerator(masterPoint.masterStationNumber + offset, masterLine, skew);
      for (let i = 0; i < girderNumber; i++) {
        pointName = "G" + (i + 1) + "K" + k;
        nameToPointDict[pointName] = LineMatch2(centerPoint, masterLine, girderLayout.girderLine[i]);
      }
      nameToPointDict["CRK" + k] = centerPoint;
    }
    for (let k in girderLayout.gridKeyPoint) {
      let centerPoint = girderLayout.gridKeyPoint[k];
      for (let i = 0; i < girderNumber; i++) {
        pointName = "G" + (i + 1) + k.substr(2);
        nameToPointDict[pointName] = LineMatch2(centerPoint, masterLine, girderLayout.girderLine[i]);
      }
      nameToPointDict[k] = centerPoint;
    }
    // for (let i=0;i<girderNumber;i++){
    const name = 0;
    const BenchMark = 1;
    const off = 2;
    for (let gp in gridInput)
      gridInput[gp].forEach(function (elem) {
        pointName = elem[name];
        let i = pointName.substr(1, 1) * 1 - 1;
        let masterstation = nameToPointDict[elem[BenchMark]].masterStationNumber + elem[off];

        let masterPoint = MasterPointGenerator(masterstation, masterLine);
        nameToPointDict[pointName] = LineMatch2(masterPoint, masterLine, girderLayout.girderLine[i]);
        //SplinePointGenerator(masterPoint, girderLayout.girderLine[i].points, masterLine.VerticalDataList, masterLine.SuperElevation);
      });
    // }
    let i = 0;
    girderLayout.masterLine.points.forEach(function (point) {
      if (point.masterStationNumber > nameToPointDict["CRK0"].masterStationNumber
        && point.masterStationNumber < nameToPointDict["CRK7"].masterStationNumber) {
        nameToPointDict["CRN" + i] = point;
        i++;
      }
    });

    return nameToPointDict
  }

  function OffsetSkewCalculator(masterPoint, masterSkew, offset, masterLine) {
    const startSkew = masterSkew;
    let offsetStation = masterPoint.masterStationNumber + offset;
    const offsetPoint = PointGenerator(offsetStation, masterLine);
    let sign = 1;
    if (masterPoint.normalCos * offsetPoint.normalSin - masterPoint.normalSin * offsetPoint.normalCos >= 0) {
      sign = 1;
    } else {
      sign = -1;
    }
    let deltaSkew = (Math.acos(masterPoint.normalCos * offsetPoint.normalCos + masterPoint.normalSin * offsetPoint.normalSin) * 180 / Math.PI).toFixed(4) * 1;
    let offsetSkew = startSkew - sign * (deltaSkew);
    // if (offsetSkew > 90) { offsetSkew -= 180; }
    // else if (offsetSkew < -90) { offsetSkew += 180; }
    return offsetSkew
  }

  const LineMatch2 = (masterPoint, masterLine, slavePoints) => {
    let resultPoint = {
      stationNumber: 0,
      x: 0,
      y: 0,
      z: 0,
      normalCos: 0,
      normalSin: 0,
      masterStationNumber: 0,
      offset: 0,
      virtual: false,
      skew: masterPoint.skew,
      gradientX: 0,
      gradientY: 0,
    };
    const unitVx = -1 * masterPoint.normalSin;
    const unitVy = masterPoint.normalCos;
    const skewRadian = resultPoint.skew * Math.PI / 180;
    let dX = unitVx * Math.cos(skewRadian) - unitVy * Math.sin(skewRadian);
    let dY = unitVx * Math.sin(skewRadian) + unitVy * Math.cos(skewRadian);
    let alpha = dY;
    let beta = -1 * dX;
    let gamma = - alpha * masterPoint.x - beta * masterPoint.y;
    let dummy1 = 0;
    let dummy2 = 0;
    let sign = 1;
    for (let i = 0; i < slavePoints.length - 1; i++) {
      dummy1 = alpha * slavePoints[i].x + beta * slavePoints[i].y + gamma;
      dummy2 = alpha * slavePoints[i + 1].x + beta * slavePoints[i + 1].y + gamma;
      if (dummy1 === 0) {
        resultPoint = slavePoints[i];
        break;
      }
      else if (dummy2 === 0) {
        resultPoint = slavePoints[i + 1];
        break;
      }
      else if (dummy1 * dummy2 < 0) {
        let coe = splineCoefficient(slavePoints[i], slavePoints[i + 1]);
        let a = alpha * coe.a2 + beta * coe.a1;
        let b = alpha * coe.b2 + beta * coe.b1;
        let c = alpha * coe.c2 + beta * coe.c1 + gamma;
        let t = 0;
        let err = 0.001;
        if (a == 0) {
          t = -c / b;
        } else {
          t = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
          if (t > 1 + err || t < -1 - err) {
            t = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
          }      }

        let deltaX = 2 * coe.a2 * (t) + coe.b2;
        let deltaY = 2 * coe.a1 * (t) + coe.b1;
        let len = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        resultPoint.normalCos = deltaY / len;
        resultPoint.normalSin = -deltaX / len;
        resultPoint.x = coe.a2 * (t ** 2) + coe.b2 * t + coe.c2;
        resultPoint.y = coe.a1 * (t ** 2) + coe.b1 * t + coe.c1;
        //   let segLen = splineLength(slaveLine.points[i],slaveLine.points[i+1]);
        //   let resultLen = splineLength(slaveLine.points[i],resultPoint);
        //   resultPoint.stationNumber = slaveLine.points[i].stationNumber + (slaveLine.points[i+1].stationNumber - slaveLine.points[i].stationNumber) * resultLen/segLen;
        // check = {a:a,b:b,c:c,t:t,tt:tt,coe:coe} ;
        break;
      }
    }

    let newMasterPoint = masterPoint.skew === 90 ? masterPoint : PointLineMatch2(resultPoint, masterLine);

    resultPoint.masterStationNumber = newMasterPoint.masterStationNumber.toFixed(4) * 1;
    resultPoint.stationNumber = resultPoint.masterStationNumber;
    if (newMasterPoint.normalCos * (resultPoint.x - newMasterPoint.x) + newMasterPoint.normalSin * (resultPoint.y - newMasterPoint.y) >= 0) {
      sign = 1;
    }
    else {
      sign = -1;
    }
    resultPoint.offset = sign * Math.sqrt((resultPoint.x - newMasterPoint.x) ** 2 + (resultPoint.y - newMasterPoint.y) ** 2).toFixed(4) * 1;
    if (sign > 0) {
      resultPoint.z = newMasterPoint.z + newMasterPoint.rightGradient * resultPoint.offset;
    } else {
      resultPoint.z = newMasterPoint.z + newMasterPoint.leftGradient * resultPoint.offset;
    }
    resultPoint.gradientX = newMasterPoint.gradientX;
    resultPoint.gradientY = sign > 0 ? newMasterPoint.rightGradient : newMasterPoint.leftGradient;
    // resultPoint.check = check

    return resultPoint
  };

  const splineCoefficient = (point1, point2) => {
    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;
    const err = 0.0001;

    let b1 = (y2 - y1) / 2;
    let b2 = (x2 - x1) / 2;
    let a1 = 0.0;
    let a2 = 0.0;
    let df1 = 0.0;
    let df2 = 0.0;


    if (point1.normalSin === 0 && point2.normalSin === 0) {
      a2 = 0;
      b2 = 0;
      a1 = 0;
    }
    if (point1.normalSin === 0 && point2.normalSin !== 0) {
      a2 = b2 / 2;
      df2 = -point2.normalCos / point2.normalSin;
      a1 = (-b1 + df2 * (2 * a2 + b2)) / 2;
    }
    if (point1.normalSin !== 0 && point2.normalSin === 0) {
      a2 = - b2 / 2;
      df1 = -point1.normalCos / point1.normalSin;
      a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2;
    }
    if (point1.normalSin !== 0 && point2.normalSin !== 0) {
      df1 = -point1.normalCos / point1.normalSin;
      df2 = -point2.normalCos / point2.normalSin;
      if (Math.abs(df1 - df2) < err) {
        a1 = 0;
        a2 = 0;
      } else {
        a2 = (2 * b1 - (df1 + df2) * b2) / (2 * (df2 - df1));
        a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2;
      }
    }



    // if (point1.normalSin === 0) {
    //   if (point2.normalSin === 0) {
    //     // return Math.abs(y2 - y1)
    //   }
    //   else {
    //     df2 = -point2.normalCos / point2.normalSin
    //     a2 = b2 / 2
    //     a1 = (-b1 + df2 * (2 * a2 + b2)) / 2
    //   }
    // } else if (point2.normalSin === 0) {
    //   if (point2.normalSin === 0) {
    //     // return Math.abs(y2 - y1)
    //   } else {
    //     df1 = -point1.normalCos / point1.normalSin
    //     a2 = b2 / -2
    //     a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2
    //   }
    // } else {
    //   df1 = -point1.normalCos / point1.normalSin
    //   df2 = -point2.normalCos / point2.normalSin

    //   if (df1 === df2) {
    //     a1 = 0
    //     a2 = 0
    //   } else {
    //     a2 = (2 * b1 - (df1 + df2) * b2) / (2 * (df2 - df1))
    //     a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2
    //   }
    // }
    const c1 = y2 - a1 - b1;
    const c2 = x2 - a2 - b2;
    return { a1: a1, b1: b1, c1: c1, a2: a2, b2: b2, c2: c2 }
  };

  function splineProp(point1, point2) {
    const coe = splineCoefficient(point1, point2);
    const w1 = 5 / 9;
    const w2 = 8 / 9;
    const w3 = w1;
    const t1 = -0.77459666924;
    const t2 = 0;
    const t3 = 0.77459666924;
    let length = Math.sqrt(Math.pow((2 * coe.a1 * t1 + coe.b1), 2) + Math.pow((2 * coe.a2 * t1 + coe.b2), 2)) * w1
      + Math.sqrt(Math.pow((2 * coe.a1 * t2 + coe.b1), 2) + Math.pow((2 * coe.a2 * t2 + coe.b2), 2)) * w2
      + Math.sqrt(Math.pow((2 * coe.a1 * t3 + coe.b1), 2) + Math.pow((2 * coe.a2 * t3 + coe.b2), 2)) * w3;
    let l = Math.sqrt(coe.b2 ** 2 + coe.b1 ** 2);
    let midPoint = { x: coe.c2, y: coe.c1, cos: coe.b2 / l, sin: coe.b1 / l, normalCos: coe.b1 / l, normalSin: -coe.b2 / l, coe: coe };
    return { length: length.toFixed(4) * 1, midPoint }
  }

  function GridStationList(pointDict) {
    let gs = [];
    let cs = [];
    for (let k in pointDict) {
      let girderIndex = k.substr(1, 1) - 1;
      if (gs.length <= girderIndex) {
        for (let i = 0; i <= girderIndex - gs.length; i++) {
          gs.push([]);
        }
      }

      if (k.substr(0, 1) === "G") {
        let s = pointDict[k].masterStationNumber;
        if (s >= pointDict["G" + (girderIndex + 1) + "K1"].masterStationNumber &&
          s <= pointDict["G" + (girderIndex + 1) + "K6"].masterStationNumber) {
          gs[girderIndex].push({ station: pointDict[k].masterStationNumber, key: k, point: pointDict[k] });
        }
      } else {
        cs.push({ station: pointDict[k].masterStationNumber, key: k, point: pointDict[k] });
      }

    }
    gs.forEach(function (elem) { elem.sort(function (a, b) { return a.station < b.station ? -1 : 1; }); });
    cs.sort(function (a, b) { return a.station < b.station ? -1 : 1; });

    for (let i = 0; i < gs.length; i++) {
      let totalLength = 0;
      let segLength = 0;
      let dummy0 = {};
      for (let j = 0; j < gs[i].length; j++) {
        let gridObj = gs[i][j];
        if (j !== 0) { segLength = splineProp(dummy0, gridObj.point).length; }      totalLength += segLength;
        // console.log("totalLength", totalLength)
        dummy0 = gridObj.point;
        gs[i][j]["point"]["girderStation"] = totalLength;
      }
    }


    return { girder: gs, centerLine: cs }
  }

  // import { LiteGraph, meshArr, THREE } from "global";
  // import {_} from "global";

  function GirderLayout(){
    this.addInput("MasterLine","line");
    this.addInput("SlaveLine","line");
    this.addInput("girderlayoutInput","girderlayoutInput");
    
    this.addOutput("girderLayout","girderLayout");
    this.addOutput("supportCount","number");
    this.addOutput("girderCount","number");
  }

  GirderLayout.prototype.onExecute = function() {
    const masterLine = this.getInputData(0);
    const slaveLine = [this.getInputData(1)];
    const girderLayoutInput = this.getInputData(2);
    const result = GirderLayoutGenerator2(masterLine, slaveLine, girderLayoutInput);
    let supportNum = girderLayoutInput.supportData.length -2;
    let girderNum = girderLayoutInput.getGirderList.length;
    this.setOutputData(0, result);
    this.setOutputData(1, supportNum);
    this.setOutputData(2, girderNum);
  };

  // LiteGraph.registerNodeType("nexivil/Girder", Girder);


  function GridPoint(){
    this.addInput("girderLayout","girderLayout");
    this.addInput("SEShape","SEShape");
    this.addInput("GridInput","GridInput");
    this.addOutput("gridPoint","gridPoint");
  }

  GridPoint.prototype.onExecute = function() {
    const girderLayout = this.getInputData(0);
    const SEShape = this.getInputData(1);
    const gridInput = this.getInputData(2);
      
    const result = GridPointGenerator3(girderLayout, SEShape, gridInput);
    this.setOutputData(0, result);
  };

  // LiteGraph.registerNodeType("nexivil/gridPoint", GridPoint);

  function StationList(){
    this.addInput("gridPoint","gridPoint");
    this.addOutput("centerLineStation","centerLineStation");
    this.addOutput("girderStation","girderStation");
  }

  StationList.prototype.onExecute = function() {
    const gridPoint = this.getInputData(0);
      
    const result = GridStationList(gridPoint);
    this.setOutputData(0, result.centerLine);
    this.setOutputData(1, result.girder);
  };

  function ToGlobalPoint(Point, node2D){
      let newPoint = {
          x:0, y:0, z:0
      };
      const cos = Point.normalCos;
      const sin = Point.normalSin;
      let skewCot = 0;
      let skew = Point.skew? Point.skew : 90;
      if (Point.skew !=90){
          skewCot = - 1 / Math.tan(skew * Math.PI/180); 
      }    let X = node2D.x;
      let Y = X * skewCot; 
      let Z = node2D.y;

      newPoint.x = Point.x + X * cos - Y*sin;
      newPoint.y = Point.y + X * sin + Y*cos;
      newPoint.z = Point.z + Z;
      newPoint.s = Point.masterStationNumber;
      newPoint.skew = skew;
      newPoint.normalCos = cos;
      newPoint.normalSin = sin;
      newPoint.girderStation = Point.girderStation;
      return newPoint
  }

  function ToGlobalPoint2(Point, node2D){
    let newPoint = {
        x:0, y:0, z:0
    };
    let skew = Point.skew? Point.skew : 90;
    const cos = Point.normalCos;
    const sin = Point.normalSin;
    // let skewCot = 0;
    // if (Point.skew !=90){
    //     skewCot = - 1 / Math.tan(Point.skew * Math.PI/180) 
    // };
    let X = node2D.x;
    let Y = node2D.y;
    let Z = Point.gradientX? Point.gradientX * node2D.y : 0;

    newPoint.x = Point.x + X * cos - Y*sin; 
    newPoint.y = Point.y + X * sin + Y*cos;
    newPoint.z = Point.z + Z;
    newPoint.s = Point.masterStationNumber;
    newPoint.skew = skew;
    newPoint.normalCos = cos;
    newPoint.normalSin = sin;
    newPoint.girderStation = Point.girderStation + Y;
    
    return newPoint
  }

  function ToGlobalPoint3(Point, node2D){ //toglobalPoint에서 직교방향 면을 기준으로 새성
    let newPoint = {
        x:0, y:0, z:0
    };
    const cos = -Point.normalSin;
    const sin = Point.normalCos;
    let skewCot = 0;
    let skew = Point.skew? Point.skew : 90;
    if (Point.skew !=90){
        skewCot = - 1 / Math.tan(skew * Math.PI/180); 
    }  let X = node2D.x;
    let Y = X * skewCot; 
    let Z = node2D.y;

    newPoint.x = Point.x + X * cos - Y*sin;
    newPoint.y = Point.y + X * sin + Y*cos;
    newPoint.z = Point.z + Z;
    newPoint.s = Point.masterStationNumber;
    newPoint.skew = skew;
    newPoint.normalCos = Point.normalCos;
    newPoint.normalSin = Point.normalSin;
    newPoint.girderStation = Point.girderStation + X;
    return newPoint
  }



  function WebPoint(point1, point2, tan1, H){
    let x;
    let y;
    if (point1.x === point2.x){
      x = point1.x;
      y = tan1 === null? null : tan1 * (x) + H;
    }else {
      let a = (point1.y - point2.y) / (point1.x - point2.x);
      let b = point1.y - a * point1.x;
      x = tan1 === null? point1.x:(b - H) / (tan1 - a);
      y = a * (x) + b; 
    }
    return {x,y}
  }

  function PlateRestPoint(point1, point2, tan1, tan2, thickness){
    let x3;
    let x4;
    let y3;
    let y4;
    if (point1.x === point2.x){
      x3 = point1.x + thickness; 
      x4 = point2.x + thickness;
      y3 = tan1 === null? null : tan1 * (x3 - point1.x) + point1.y;
      y4 = tan2 === null? null : tan2 * (x4 - point2.x) + point2.y;
    }else {
      let a = (point1.y - point2.y) / (point1.x - point2.x);
      let b = point1.y - a * point1.x;
      let alpha = thickness * Math.sqrt(1 + 1/a**2);
      x3 = tan1 === null? point1.x:(-a * alpha + b + tan1 * point1.x - point1.y) / (tan1 - a);
      x4 = tan2 === null? point2.x:(-a * alpha + b + tan2 * point2.x - point2.y) / (tan2 - a);
      y3 = a ===0? point1.y + thickness : a * (x3 - alpha) + b; 
      y4 = a ===0? point2.y + thickness : a * (x4 - alpha) + b;
    }
    return [point1,point2,{x:x4,y:y4},{x:x3,y:y3}]
  }

  function Kframe(node1, node2, ioffset, joffset, pts){
    let length = Math.sqrt((node2.x-node1.x)**2 + (node2.y-node1.y)**2);
    let vec = Vector2D(node1, node2);
    let plate1 = [ XYOffset(node1,vec,ioffset,pts[0]),
                  XYOffset(node1,vec,ioffset,pts[1]),
                  XYOffset(node1,vec,(length-joffset),pts[1]),
                  XYOffset(node1,vec,(length-joffset),pts[0]), ];
    let plate2 = [ XYOffset(node1,vec,ioffset,pts[2]),
                  XYOffset(node1,vec,ioffset,pts[3]),
                  XYOffset(node1,vec,(length-joffset),pts[3]),
                  XYOffset(node1,vec,(length-joffset),pts[2]),];
    return [plate1, plate2]
  }

  function XYOffset(node, vector, xoffset, yoffset){
    return {
      x:node.x + vector.x *xoffset - vector.y* yoffset, 
      y: node.y + vector.y * xoffset + vector.x* yoffset}
    }
  function Vector2D(node1,node2){ //2D에서만 유효한벡터임
    let length = Math.sqrt((node2.x-node1.x)**2 + (node2.y-node1.y)**2);
    return {x :(node2.x-node1.x)/length, y:(node2.y-node1.y)/length }
  }

  function scallop(point1,point2,point3,radius,smoothness){
    let points = [];
    let v1 = new global.THREE.Vector2(point1.x - point2.x, point1.y - point2.y).normalize();
    let v2 = new global.THREE.Vector2(point3.x - point2.x, point3.y - point2.y).normalize();
    for (let i = 0; i < smoothness+1 ; i++){
      let v3 = new global.THREE.Vector2().addVectors(v1.clone().multiplyScalar(smoothness - i), v2.clone().multiplyScalar(i)).setLength(radius);
      points.push({x: v3.x + point2.x, y: v3.y +point2.y});
    }
    return points
  }

  function DividingPoint(point1, point2, length){
    //length is distance from point1 to new point in directing point2
    let result = {};
    if (point1.z && point2.z){
      let a = length / Math.sqrt((point1.x- point2.x)**2+(point1.y- point2.y)**2+(point1.z- point2.z)**2);
      result = {x:(1-a)*point1.x + a * point2.x, y:(1-a)*point1.y + a * point2.y,z:(1-a)*point1.z + a * point2.z};
    } else {
      let a = length / Math.sqrt((point1.x- point2.x)**2+(point1.y- point2.y)**2);
      result = {x:(1-a)*point1.x + a * point2.x, y:(1-a)*point1.y + a * point2.y, z : 0 };
    }
    
    return result
  }

  function Fillet2D(point1, point2, point3, radius, smoothness){
    let lv1 = Math.sqrt((point1.x - point2.x)**2 + (point1.y - point2.y)**2);  
    let lv2 = Math.sqrt((point3.x - point2.x)**2 + (point3.y - point2.y)**2);  
    let v1 = {x: (point1.x - point2.x)/lv1, y:(point1.y - point2.y)/lv1 };
    let v2 = {x: (point3.x - point2.x)/lv2, y:(point3.y - point2.y)/lv2 };
    let ang = Math.acos(v1.x*v2.x + v1.y*v2.y);
    let l1 = radius / Math.sin(ang / 2) / Math.sqrt((v1.x+v2.x)**2+(v1.y+v2.y)**2);
    let v3 = {x : (v1.x+v2.x) * l1, y : (v1.y+v2.y) * l1};
    let centerPoint = {x: point2.x + v3.x, y:point2.y + v3.y};
    let l2 = radius / Math.tan(ang / 2);
    let p1 = {x: point2.x + v1.x * l2, y:point2.y + v1.y*l2};
    let p2 = {x: point2.x + v2.x * l2, y:point2.y + v2.y*l2};
    let vc1 = {x: p1.x - centerPoint.x, y:p1.y - centerPoint.y};
    let vc2 = {x: p2.x- centerPoint.x, y:p2.y - centerPoint.y};
    let points = [];
    points.push(p1);
      for (let j = 0; j < smoothness; j++) {
        let dirVec = {x:vc1.x * (smoothness - j) + vc2.x * (j+1) , y: vc1.y * (smoothness - j) + vc2.y * (j+1)};
        let l3 = radius / Math.sqrt(dirVec.x**2+dirVec.y**2);
        points.push({x: centerPoint.x + dirVec.x * l3, y:centerPoint.y + dirVec.y * l3});
      }
    points.push(p2);
    return points
   }

  function ZOffsetLine(points, z) {
    let result = [];
    let vec = [];
    let cos = [];
    let err = 0.001;
    for (let i = 0; i < points.length - 1; i++) {
      let l = Math.sqrt((points[i].x - points[i + 1].x) ** 2 + (points[i].y - points[i + 1].y) ** 2 + (points[i].z - points[i + 1].z) ** 2);
      vec.push({ x: (points[i + 1].x - points[i].x) / l, y: (points[i + 1].y - points[i].y) / l, z: (points[i + 1].z - points[i].z) / l });
      cos.push(Math.sqrt((points[i].x - points[i + 1].x) ** 2 + (points[i].y - points[i + 1].y) ** 2) / l);
    }
    if (cos[0] == 0) {
      result.push(ZMove(points[0], z));
    } else {
      result.push(ZMove(points[0], z / cos[0]));
    }
    for (let i = 0; i < vec.length - 1; i++) {
      let costheta = -vec[i + 1].x * vec[i].x - vec[i + 1].y * vec[i].y - vec[i + 1].z * vec[i].z;
      if (costheta >= 1 - err || costheta <= -1 + err) {
        if (cos[i] == 0) {
          result.push(ZMove(points[i + 1], z));
        } else {
          result.push(ZMove(points[i + 1], z / cos[i]));
        }
      } else {
        if (costheta){
          let sinHalftheta = Math.sqrt((1 - costheta) / 2);
          let z2 = sinHalftheta === 0 ? z : z / sinHalftheta;
          let vecSum = { x: (vec[i + 1].x - vec[i].x), y: (vec[i + 1].y - vec[i].y), z: (vec[i + 1].z - vec[i].z) };
          let l2 = Math.sqrt(vecSum.x ** 2 + vecSum.y ** 2 + vecSum.z ** 2);
          result.push({ x: points[i + 1].x + vecSum.x / l2 * z2, y: points[i + 1].y + vecSum.y / l2 * z2, z: points[i + 1].z + vecSum.z / l2 * z2 });
        }
      }
    }

    result.push(ZMove(points[points.length - 1], z / cos[cos.length - 1]));
    return result
  }

  function ZMove(point, z) {
    return { x: point.x, y: point.y, z: point.z + z }
  }

  function SectionPointDict(pointDict, girderBaseInfo, slabInfo, slabLayout) {
      let result = {};
      let slabToGirder = slabInfo.slabToGirder;

      for (let k in pointDict) {
          if (k.substr(0, 1) === "G") {
              let point = pointDict[k];
              let girderIndex = k.substr(1, 1) - 1;
              let baseInput = {};
              let station = point.masterStationNumber;
              let isFlat = girderBaseInfo[girderIndex].section.isFlat;
              let gradient = isFlat ? 0 : point.gradientY;
              let skew = point.skew;
              let pointSectionInfo = PointSectionInfo(station, skew, girderBaseInfo[girderIndex], slabLayout, pointDict);
              let sectionInfo = girderBaseInfo[girderIndex].section;

              const centerThickness = slabInfo.slabThickness + slabInfo.haunchHeight; //  slab변수 추가
              //   const height = pointSectionInfo.forward.height + centerThickness;
              const lwb = { x: - sectionInfo.B / 2, y: -sectionInfo.H - centerThickness };
              const lwt = { x: - sectionInfo.UL, y: - centerThickness };
              const rwb = { x: sectionInfo.B / 2, y: -sectionInfo.H - centerThickness };
              const rwt = { x: sectionInfo.UR, y: -centerThickness };
              let forward = {};
              let backward = {};
              let ps = {};
              // let skew = pointSectionInfo.forward.skew; // gridPoint의 skew가 있어 사용여부 확인후 삭제요망
              for (let i = 0; i < 2; i++) {
                  if (i === 0) {
                      ps = pointSectionInfo.forward;
                  } else {
                      ps = pointSectionInfo.backward;
                  }
                  let bottomY = ps.height + centerThickness;
                  let topY = slabToGirder ? ps.slabThickness + slabInfo.haunchHeight : centerThickness;

                  let LRib = [];
                  for (let j in ps.lRibLO) {
                      let lRib = [{ x: ps.lRibLO[j] - ps.lRibThk / 2, y: -bottomY }, { x: ps.lRibLO[j] - ps.lRibThk / 2, y: -bottomY + ps.lRibH },
                      { x: ps.lRibLO[j] + ps.lRibThk / 2, y: -bottomY + ps.lRibH }, { x: ps.lRibLO[j] + ps.lRibThk / 2, y: -bottomY }];
                      // let keyname = "lRib" + j
                      // LRib[keyname] = lRib
                      LRib.push(lRib);
                  }


                  let URib = [];
                  for (let j in ps.uRibLO) {
                      let uRib = [{ x: ps.uRibLO[j] - ps.uRibThk / 2, y: -topY + (ps.uRibLO[j] - ps.uRibThk / 2) * gradient },
                      { x: ps.uRibLO[j] - ps.uRibThk / 2, y: -topY - ps.uRibH + ps.uRibLO[j] * gradient },
                      { x: ps.uRibLO[j] + ps.uRibThk / 2, y: -topY - ps.uRibH + ps.uRibLO[j] * gradient },
                      { x: ps.uRibLO[j] + ps.uRibThk / 2, y: -topY + (ps.uRibLO[j] + ps.uRibThk / 2) * gradient }];
                      // let keyname = "uRib" + j
                      // URib[keyname] = uRib
                      URib.push(uRib);
                  }

                  // leftWeb
                  let lw1 = WebPoint(lwb, lwt, 0, -bottomY); //{x:blwX,y:-height}
                  let lw2 = WebPoint(lwb, lwt, gradient, -topY); //{x:tlwX,y:gradient*tlwX - slabThickness}
                  let lWeb = PlateRestPoint(lw1, lw2, 0, gradient, -ps.webThk);
                  // rightWeb
                  let rw1 = WebPoint(rwb, rwt, 0, -bottomY); //{x:brwX,y:-height}
                  let rw2 = WebPoint(rwb, rwt, gradient, -topY); //{x:trwX,y:gradient*trwX - slabThickness}
                  let rWeb = PlateRestPoint(rw1, rw2, 0, gradient, ps.webThk);
                  // bottomplate
                  let b1 = { x: lw1.x - sectionInfo.C1, y: -bottomY };
                  let b2 = { x: rw1.x + sectionInfo.D1, y: -bottomY };
                  let bottomPlate = PlateRestPoint(b1, b2, null, null, -ps.lFlangeThk);

                  // newbottomplate
                  let lflange = [[], [], []];
                  let newbl1 = { x: lw1.x - ps.lFlangeC, y: -bottomY };
                  let newbl2 = { x: lw1.x - ps.lFlangeC + ps.lFlangeW, y: -bottomY };
                  let newbr1 = { x: rw1.x + ps.lFlangeC, y: -bottomY };
                  let newbr2 = { x: rw1.x + ps.lFlangeC - ps.lFlangeW, y: -bottomY };
                  if (newbl2.x < newbr2.x) { //양측의 플렌지가 서로 중첩될 경우
                      lflange[0] = PlateRestPoint(newbl1, newbl2, null, null, -ps.lFlangeThk);//gradient가 0인 경우, inf에 대한 예외처리 필요
                      lflange[1] = PlateRestPoint(newbr1, newbr2, null, null, -ps.lFlangeThk);                } else {
                      lflange[2] = PlateRestPoint(newbl1, newbr1, null, null, -ps.lFlangeThk);                }

                  let tan = gradient === 0 ? null : -1 / gradient;
                  let rad = Math.atan(gradient);
                  let cos = Math.cos(rad);
                  let sin = Math.sin(rad);
                  // TopPlate
                  let tl1 = { x: lw2.x - sectionInfo.C, y: lw2.y + gradient * (- sectionInfo.C) };
                  let tl2 = { x: lw2.x - sectionInfo.C + ps.uFlangeW, y: lw2.y + gradient * (- sectionInfo.C + ps.uFlangeW) };
                  let topPlate1 = PlateRestPoint(tl1, tl2, tan, tan, ps.uFlangeThk);//gradient가 0인 경우, inf에 대한 예외처리 필요
                  let tr1 = { x: rw2.x + sectionInfo.D, y: rw2.y + gradient * (sectionInfo.D) };
                  let tr2 = { x: rw2.x + sectionInfo.D - ps.uFlangeW, y: rw2.y + gradient * (sectionInfo.D - ps.uFlangeW) };
                  let topPlate2 = PlateRestPoint(tr1, tr2, tan, tan, ps.uFlangeThk);                // newTopPlate
                  let uflange = [[], [], []];
                  let newtl1 = { x: lw2.x - ps.uFlangeC, y: lw2.y + gradient * (- ps.uFlangeC) };
                  let newtl2 = { x: lw2.x - ps.uFlangeC + ps.uFlangeW, y: lw2.y + gradient * (- ps.uFlangeC + ps.uFlangeW) };
                  let newtr1 = { x: rw2.x + ps.uFlangeC, y: rw2.y + gradient * (ps.uFlangeC) };
                  let newtr2 = { x: rw2.x + ps.uFlangeC - ps.uFlangeW, y: rw2.y + gradient * (ps.uFlangeC - ps.uFlangeW) };

                  if (newtl2.x < newtr2.x) { //양측의 플렌지가 서로 중첩될 경우
                      uflange[0] = [newtl1, newtl2, {x : newtl2.x - sin * ps.uFlangeThk, y: newtl2.y + cos * ps.uFlangeThk}, 
                                  {x : newtl1.x - sin * ps.uFlangeThk, y: newtl1.y + cos * ps.uFlangeThk}];
                      uflange[1] = [newtr1, newtr2, {x : newtr2.x - sin * ps.uFlangeThk, y: newtr2.y + cos * ps.uFlangeThk}, 
                          {x : newtr1.x - sin * ps.uFlangeThk, y: newtr1.y + cos * ps.uFlangeThk}];
                  } else {
                      uflange[2] = [newtl1, newtr1, {x : newtr1.x - sin * ps.uFlangeThk, y: newtr1.y + cos * ps.uFlangeThk}, 
                          {x : newtl1.x - sin * ps.uFlangeThk, y: newtl1.y + cos * ps.uFlangeThk}];
                  }
                  let uflangeSide = [-topY, -topY + ps.uFlangeThk];
                  let lflangeSide = [-bottomY, -bottomY - ps.lFlangeThk];
                  let webSide = [-bottomY, -topY];
                  baseInput = {
                      isDoubleComposite: false, // 추후 PointSectionInfo에 관련 변수 추가
                      isClosedTop: tl2.x < tr1.x ? true : false,
                      B1: rw1.x - lw1.x,                                 //강거더 하부 내부폭
                      B2: rw2.x - lw2.x,                                 //강거더 상부 내부폭
                      B3: 3500,  //바닥판 콘크리트 폭                      //슬래브에 대한 정보는 외부에서 받아와야 함
                      wlw: Point2DLength(lw1, lw2),                       //좌측웹 폭
                      wrw: Point2DLength(rw1, rw2),                       //우측웹 폭
                      wuf: newtl2.x < newtr2.x ? ps.uFlangeW : newtr1.x - newtl1.x,       //상부플랜지 폭
                      wlf: newbl2.x < newbr2.x ? ps.lFlangeW : newbr1.x - newbl1.x,       //하부플랜지 
                      gradient :gradient,                           //상부플랜지 기울기
                      gradientlf : ps.lFlangeGradient,
                      H: bottomY - topY,                           //강거더 높이
                      tlf: ps.lFlangeThk,                                //하부플랜지 두께
                      tuf: ps.uFlangeThk,                                 //상부플랜지두께
                      tw: ps.webThk,                                      //웹두께
                      Tcu: ps.slabThickness,                              //바닥판콘크리트 두께          
                      Th: slabInfo.haunchHeight,                                   //헌치두께
                      Tcl: 0,                       //지점콘크리트 두께     //지점콘크리트에 대한 입력 변수 추가
                      blf: ps.lFlangeC,            //하부플랜지 외부폭
                      buf: ps.uFlangeC,             //상부플랜지 외부폭
                      Urib: { thickness: ps.uRibThk, height: ps.uRibH, layout: ps.uRibLO },
                      Lrib: { thickness: ps.lRibThk, height: ps.lRibH, layout: ps.lRibLO },
                      horizontal_bracing: { d0: 2500, vbArea: 50, dbArea: 50 }, //수직보강재 간격, 수평브레이싱 수직, 사재 단면적
                  };
                  if (i === 0) {
                      forward = { input: baseInput, skew, bottomPlate: bottomPlate, leftTopPlate: topPlate1, rightTopPlate: topPlate2, lWeb: lWeb, rWeb: rWeb, LRib, URib, uflange, lflange, web: [lWeb, rWeb], uflangeSide, lflangeSide, webSide };
                  } else {
                      backward = { input: baseInput, skew, bottomPlate: bottomPlate, leftTopPlate: topPlate1, rightTopPlate: topPlate2, lWeb: lWeb, rWeb: rWeb, LRib, URib, uflange, lflange, web: [lWeb, rWeb], uflangeSide, lflangeSide, webSide };
                  }
              }
              result[k] = { forward, backward };
          }
      }
      return result
  }

  function PointSectionInfo(station, skew, girderBaseInfo, slabLayout, pointDict) {
      let forward = {
          height: 0,
          slabThickness: 0,
          skew: skew,
          uFlangeC: 0,//캔틸레버길이를 의미함
          uFlangeW: 0,//
          uFlangeThk: 0,
          lFlangeC: 0,//캘틸레버길이를 의미함
          lFlangeW: 0,//
          lFlangeThk: 0,
          lFlangeGradient:0,
          webThk: 0,
          uRibH: 0,
          uRibThk: 0,
          uRibLO: [],
          lRibH: 0,
          lRibThk: 0,
          lRibLO: [],
      };
      let backward = {
          height: 0,
          slabThickness: 0,
          skew: skew,
          uFlangeC: 0,
          uFlangeW: 0,
          uFlangeThk: 0,
          lFlangeC: 0,//캘틸레버길이를 의미함
          lFlangeW: 0,//
          lFlangeThk: 0,
          lFlangeGradient:0,
          webThk: 0,
          uRibH: 0,
          uRibThk: 0,
          uRibLO: [],
          lRibH: 0,
          lRibThk: 0,
          lRibLO: [],
      };

      let R = 0;
      let x1 = 0;
      let deltaH = 0;
      let L = 0;
      let height = 0;
      let heightb = 0;
      for (let i = 0; i < girderBaseInfo.height.length; i++) {
          let sp = pointDict[girderBaseInfo.height[i][0]];
          let ep = pointDict[girderBaseInfo.height[i][1]];
          if (station >= sp.masterStationNumber && station < ep.masterStationNumber) {
              deltaH = girderBaseInfo.height[i][2] - girderBaseInfo.height[i][3];
              L = ep.masterStationNumber - sp.masterStationNumber;
              if (girderBaseInfo.height[i][4] == "circle") {
                  if (deltaH > 0) {
                      R = Math.abs((L ** 2 + deltaH ** 2) / 2 / deltaH);
                      x1 = ep.masterStationNumber - station;
                      height = girderBaseInfo.height[i][3] + (R - Math.sqrt(R ** 2 - x1 ** 2));
                      forward.lFlangeGradient = x1 / Math.sqrt(R ** 2 - x1 ** 2);
                  } else if (deltaH < 0) {
                      R = Math.abs((L ** 2 + deltaH ** 2) / 2 / deltaH);
                      x1 = station - sp.masterStationNumber;
                      height = girderBaseInfo.height[i][2] + (R - Math.sqrt(R ** 2 - x1 ** 2));
                      forward.lFlangeGradient = - x1 / Math.sqrt(R ** 2 - x1 ** 2);
                  } else {
                      height = girderBaseInfo.height[i][2];
                      forward.lFlangeGradient = 0;
                  }
              } else if (girderBaseInfo.height[i][4] == "parabola") {
                  if (deltaH > 0) {
                      x1 = ep.masterStationNumber - station;
                      height = girderBaseInfo.height[i][3] + deltaH / L ** 2 * x1 ** 2;
                      forward.lFlangeGradient = deltaH / L ** 2 * x1 * 2 ;
                  } else if (deltaH < 0) {
                      x1 = station - sp.masterStationNumber;
                      height = girderBaseInfo.height[i][2] - deltaH / L ** 2 * x1 ** 2;
                      forward.lFlangeGradient = - deltaH / L ** 2 * x1 * 2 ;
                  } else {
                      height = girderBaseInfo.height[i][2];
                      forward.lFlangeGradient = 0;
                  }
              } else {  //straight
                  x1 = station - sp.masterStationNumber;
                  height = girderBaseInfo.height[i][2] - x1 / L * deltaH;
                  forward.lFlangeGradient = deltaH / L ;
              }
          }

          if (station > sp.masterStationNumber && station <= ep.masterStationNumber) {
              deltaH = girderBaseInfo.height[i][2] - girderBaseInfo.height[i][3];
              L = ep.masterStationNumber - sp.masterStationNumber;
              if (girderBaseInfo.height[i][4] == "circle") {
                  if (deltaH > 0) {
                      R = Math.abs((L ** 2 + deltaH ** 2) / 2 / deltaH);
                      x1 = ep.masterStationNumber - station;
                      heightb = girderBaseInfo.height[i][3] + (R - Math.sqrt(R ** 2 - x1 ** 2));
                      backward.lFlangeGradient = x1 / Math.sqrt(R ** 2 - x1 ** 2);
                  } else if (deltaH < 0) {
                      R = Math.abs((L ** 2 + deltaH ** 2) / 2 / deltaH);
                      x1 = station - sp.masterStationNumber;
                      heightb = girderBaseInfo.height[i][2] + (R - Math.sqrt(R ** 2 - x1 ** 2));
                      backward.lFlangeGradient = - x1 / Math.sqrt(R ** 2 - x1 ** 2);
                  } else {
                      heightb = girderBaseInfo.height[i][2];
                      backward.lFlangeGradient = 0;
                  }
              } else if (girderBaseInfo.height[i][4] == "parabola") {
                  if (deltaH > 0) {
                      x1 = ep.masterStationNumber - station;
                      heightb = girderBaseInfo.height[i][3] + deltaH / L ** 2 * x1 ** 2;
                      backward.lFlangeGradient = deltaH / L ** 2 * x1 * 2 ;
                  } else if (deltaH < 0) {
                      x1 = station - sp.masterStationNumber;
                      heightb = girderBaseInfo.height[i][2] - deltaH / L ** 2 * x1 ** 2;
                      backward.lFlangeGradient = - deltaH / L ** 2 * x1 * 2 ;
                  } else {
                      heightb = girderBaseInfo.height[i][2];
                      backward.lFlangeGradient = 0;
                  }
              } else {  //straight
                  x1 = station - sp.masterStationNumber;
                  heightb = girderBaseInfo.height[i][2] - x1 / L * deltaH;
                  backward.lFlangeGradient = deltaH / L;
              }
          }
      }
      forward.height = height;    //
      backward.height = heightb === 0 ? height : heightb;   //형고가 불연속인 경우, 단부절취의 경우 수정이 필요함
      // position:0, T:1, H:2
      let slabThickness = 0;
      for (let i = 0; i < slabLayout.length - 1; i++) {
          let ss = pointDict[slabLayout[i][0]].masterStationNumber;
          let es = pointDict[slabLayout[i + 1][0]].masterStationNumber;
          if (station >= ss && station <= es) {
              let x = station - ss;
              let l = es - ss;
              slabThickness = slabLayout[i][2] * (l - x) / l + slabLayout[i + 1][2] * (x) / l;
          }
      }

      forward.slabThickness = slabThickness;
      backward.slabThickness = slabThickness;

      var uFlange = girderBaseInfo.uFlange.filter(function (element) {
          return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
      });
      if (uFlange.length > 0) {
          forward.uFlangeThk = uFlange[0][2];
          forward.uFlangeW = uFlange[0][3] + (uFlange[0][4] - uFlange[0][3]) * (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber);
          forward.uFlangeC = uFlange[0][5] + (uFlange[0][6] - uFlange[0][5]) * (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber);
      }
      uFlange = girderBaseInfo.uFlange.filter(function (element) {
          return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
      });
      if (uFlange.length > 0) {
          backward.uFlangeThk = uFlange[0][2];
          backward.uFlangeW = uFlange[0][3] + (uFlange[0][4] - uFlange[0][3]) * (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber);
          backward.uFlangeC = uFlange[0][5] + (uFlange[0][6] - uFlange[0][5]) * (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber);
      }

      var lFlange = girderBaseInfo.lFlange.filter(function (element) {
          return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
      });
      if (lFlange.length > 0) {
          forward.lFlangeThk = lFlange[0][2];
          forward.lFlangeW = lFlange[0][3] + (lFlange[0][4] - lFlange[0][3]) * (station - pointDict[lFlange[0][0]].masterStationNumber) / (pointDict[lFlange[0][1]].masterStationNumber - pointDict[lFlange[0][0]].masterStationNumber);
          forward.lFlangeC = lFlange[0][5] + (lFlange[0][6] - lFlange[0][5]) * (station - pointDict[lFlange[0][0]].masterStationNumber) / (pointDict[lFlange[0][1]].masterStationNumber - pointDict[lFlange[0][0]].masterStationNumber);
      }
      lFlange = girderBaseInfo.lFlange.filter(function (element) {
          return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
      });
      if (lFlange.length > 0) {
          backward.lFlangeThk = lFlange[0][2];
          backward.lFlangeW = lFlange[0][3] + (lFlange[0][4] - lFlange[0][3]) * (station - pointDict[lFlange[0][0]].masterStationNumber) / (pointDict[lFlange[0][1]].masterStationNumber - pointDict[lFlange[0][0]].masterStationNumber);
          backward.lFlangeC = lFlange[0][5] + (lFlange[0][6] - lFlange[0][5]) * (station - pointDict[lFlange[0][0]].masterStationNumber) / (pointDict[lFlange[0][1]].masterStationNumber - pointDict[lFlange[0][0]].masterStationNumber);
      }

      var web = girderBaseInfo.web.filter(function (element) {
          return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
      });
      if (web.length > 0) {
          forward.webThk = web[0][2];
      }
      web = girderBaseInfo.web.filter(function (element) {
          return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
      });
      if (web.length > 0) {
          backward.webThk = web[0][2];
      }

      var uRib = girderBaseInfo.uRib.filter(function (element) {
          return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
      });
      if (uRib.length > 0) {
          forward.uRibThk = uRib[0][2];
          forward.uRibH = uRib[0][3];
          forward.uRibLO = uRib[0][4];
      }
      uRib = girderBaseInfo.uRib.filter(function (element) {
          return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
      });
      if (uRib.length > 0) {
          backward.uRibThk = uRib[0][2];
          backward.uRibH = uRib[0][3];
          backward.uRibLO = uRib[0][4];
      }

      var lRib = girderBaseInfo.lRib.filter(function (element) {
          return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
      });
      if (lRib.length > 0) {
          forward.lRibThk = lRib[0][2];
          forward.lRibH = lRib[0][3];
          forward.lRibLO = lRib[0][4];
      }
      lRib = girderBaseInfo.lRib.filter(function (element) {
          return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
      });
      if (lRib.length > 0) {
          backward.lRibThk = lRib[0][2];
          backward.lRibH = lRib[0][3];
          backward.lRibLO = lRib[0][4];
      }

      return { forward, backward }
  }

  function DeckSectionPoint(
      masterLine,
      centerLineStations,
      girderStation,
      girderLayout,
      slabInfo,
      slabLayout,
      girderBaseInfo,
      pointDict,
  ) {
      let result = [];
      let deckLineDict = [[], []];
      // let slab1 = [];
      // let slab2 = [];
      const position = 0;
      const T = 1;
      const H = 2;
      // const leftOffset = 3;
      // const rightOffset = 4;

      let centerSlabThickness = slabInfo.slabThickness;
      let haunch = slabInfo.haunchHeight;
      let endT = 0;
      let leftOffset = 0;
      let rightOffset = 0;
      let slabThickness = 0;
      for (let i = 0; i < girderStation.length; i += girderStation.length - 1) {
          for (let j in girderStation[i]) {
              if (girderStation[i][j].key.substr(2, 1) === "D") {
                  let masterStation = girderStation[i][j].point.masterStationNumber;
                  let masterPoint = MasterPointGenerator(masterStation, masterLine, girderStation[i][j].point.skew);
                  let key = girderStation[i][j].key.substr(2);

                  for (let i = 0; i < slabLayout.length - 1; i++) {
                      let ss = pointDict[slabLayout[i][position]].masterStationNumber;
                      let es = pointDict[slabLayout[i + 1][position]].masterStationNumber;
                      if (masterStation >= ss && masterStation <= es) {
                          let x = masterStation - ss;
                          let l = es - ss;
                          leftOffset = slabLayout[i][3] * (l - x) / l + slabLayout[i + 1][3] * (x) / l;
                          rightOffset = slabLayout[i][4] * (l - x) / l + slabLayout[i + 1][4] * (x) / l;
                          slabThickness = slabLayout[i][H] * (l - x) / l + slabLayout[i + 1][H] * (x) / l;
                          endT = slabLayout[i][T] * (l - x) / l + slabLayout[i + 1][T] * (x) / l;
                      }
                  }
                  //deckSectionInfo로 분리예정
                  if (i === 0) {
                      deckLineDict[0].push({ key: "LD" + key, point: OffsetPoint(masterPoint, masterLine, leftOffset), endT });
                  } else {
                      deckLineDict[1].push({ key: "RD" + key, point: OffsetPoint(masterPoint, masterLine, rightOffset), endT });
                  }
              }
          }
      }


      for (let i = 1; i < centerLineStations.length - 1; i++) {

          let masterPoint = centerLineStations[i].point;
          let masterStation = masterPoint.masterStationNumber;
          let deckSectionPoint = [];
          //deckSectionInfo로 분리예정
          for (let i = 0; i < slabLayout.length - 1; i++) {
              let ss = pointDict[slabLayout[i][position]].masterStationNumber;
              let es = pointDict[slabLayout[i + 1][position]].masterStationNumber;
              if (masterStation >= ss && masterStation <= es) {
                  let x = masterStation - ss;
                  let l = es - ss;
                  leftOffset = slabLayout[i][3] * (l - x) / l + slabLayout[i + 1][3] * (x) / l;
                  rightOffset = slabLayout[i][4] * (l - x) / l + slabLayout[i + 1][4] * (x) / l;
                  slabThickness = slabLayout[i][H] * (l - x) / l + slabLayout[i + 1][H] * (x) / l;
                  endT = slabLayout[i][T] * (l - x) / l + slabLayout[i + 1][T] * (x) / l;
              }
          }
          //deckSectionInfo로 분리예정
          let leftPoint = OffsetPoint(masterPoint, masterLine, leftOffset);
          let rightPoint = OffsetPoint(masterPoint, masterLine, rightOffset);
          if (centerLineStations[i].key.substr(0, 3) !== "CRN" && centerLineStations[i].key !== "CRK0" && centerLineStations[i].key !== "CRK7") {
              let key = centerLineStations[i].key.substr(2); // deckLineDict는 합성후 해석모델 단면정보에 들어감.
              deckLineDict[0].push({ key: "LD" + key, point: leftPoint, endT });
              deckLineDict[1].push({ key: "RD" + key, point: rightPoint, endT });
          }
          let slabUpperPoints = [leftPoint, masterPoint, rightPoint];

          deckSectionPoint.push({ x: leftOffset, y: leftPoint.z - endT }, { x: leftOffset, y: leftPoint.z }, { x: 0, y: masterPoint.z }, { x: rightOffset, y: rightPoint.z }, { x: rightOffset, y: rightPoint.z - endT });
          let slabLowerPoints = [];
          let offsetPoint = [leftOffset];
          let glw = [];
          for (let j in girderLayout.girderLine) {
              // let gridName = "G" + (j * 1 + 1) + slabLayout[i].position.substr(2, 2)
              let girderLine = girderLayout.girderLine[j];
              let girderPoint = LineMatch2(masterPoint, masterLine, girderLine);
              let lw = [];
              
              if (centerLineStations[i].key === "CRK0"){
                  let gridName = "G" + (j * 1 + 1) + "K1";
                  lw = UflangePoint(pointDict[gridName], pointDict, girderBaseInfo[j], slabInfo, slabLayout);
              } else if (centerLineStations[i].key === "CRK7"){
                  let dummyPoint = LineMatch2(pointDict["CRK6"], masterLine, girderLine);
                  lw = UflangePoint(dummyPoint, pointDict, girderBaseInfo[j], slabInfo, slabLayout);
              } else {
                  lw = UflangePoint(girderPoint, pointDict, girderBaseInfo[j], slabInfo, slabLayout);
              }
              lw.forEach(elem => glw.push({ x: elem.x + girderPoint.offset, y: elem.y + girderPoint.z }));
              //haunch포인트에 대한 내용을 위의함수에 포함하여야 함. 
              //추후 three.js union함수를 통한 바닥판 계산을 하는것은 어떨지 고민중
              lw.forEach(element => slabLowerPoints.push(ToGlobalPoint(girderPoint, element)));
              offsetPoint.push(girderPoint.offset);
          }
          glw.pop();//우측캔틸레버 헌치 포인트 제거
          glw.shift();//좌측캔틸레버 헌치 포인트 제거
          slabLowerPoints.pop();//우측캔틸레버 헌치 포인트 제거
          slabLowerPoints.shift();//좌측캔틸레버 헌치 포인트 제거

          deckSectionPoint.push(...glw.reverse());
          offsetPoint.push(rightOffset);
          slabLowerPoints.unshift({ x: leftPoint.x, y: leftPoint.y, z: leftPoint.z - endT });
          slabLowerPoints.push({ x: rightPoint.x, y: rightPoint.y, z: rightPoint.z - endT });
          result.push({ name: masterStation, key: centerLineStations[i].key, slabUpperPoints, slabLowerPoints, offsetPoint, deckSectionPoint, slabHeight: slabThickness + haunch });

      }
      deckLineDict[0].sort(function (a, b) { return a.point.masterStationNumber < b.point.masterStationNumber ? -1 : 1; });
      deckLineDict[1].sort(function (a, b) { return a.point.masterStationNumber < b.point.masterStationNumber ? -1 : 1; });

      return { deckPointDict: result, deckLineDict } //{ slab1, slab2 }
  }
  //UflangePoint는 상부플랜지 헌치의 하단좌표를 출력하는 함수임
  function 
  UflangePoint(girderPoint, pointDict, girderBaseInfo, slabInfo, slabLayout) {

      let slabToGirder = slabInfo.slabToGirder;
      let points = [];
      let station = girderPoint.masterStationNumber;
      let isFlat = girderBaseInfo.section.isFlat;
      let gradient = isFlat ? 0 : girderPoint.gradientY;
      let skew = girderPoint.skew;
      let pointSectionInfo = PointSectionInfo(station, skew, girderBaseInfo, slabLayout, pointDict); // slabThickness만 필요한 경우에는 흠...
      
      let sectionInfo = girderBaseInfo.section;
      let ps = pointSectionInfo.forward.uFlangeW === 0 ? pointSectionInfo.backward : pointSectionInfo.forward;
      const centerThickness = slabInfo.slabThickness + slabInfo.haunchHeight; //  slab변수 추가
      let topY = slabToGirder ? ps.slabThickness + slabInfo.haunchHeight : centerThickness;
      const lwb = { x: - sectionInfo.B / 2, y: -sectionInfo.H - centerThickness };
      const lwt = { x: - sectionInfo.UL, y: - centerThickness };
      const rwb = { x: sectionInfo.B / 2, y: -sectionInfo.H - centerThickness };
      const rwt = { x: sectionInfo.UR, y: -centerThickness };
      let lw2 = WebPoint(lwb, lwt, gradient, -topY); //{x:tlwX,y:gradient*tlwX - slabThickness}
      let rw2 = WebPoint(rwb, rwt, gradient, -topY); //{x:trwX,y:gradient*trwX - slabThickness}
      let w1 = slabInfo.w1; //헌치돌출길이
      let hh = slabInfo.haunchHeight; //헌치높이
      let wx = [lw2.x - ps.uFlangeC - w1, lw2.x - ps.uFlangeC + ps.uFlangeW + w1, rw2.x + ps.uFlangeC + w1, rw2.x + ps.uFlangeC - ps.uFlangeW - w1];
      let hl = [];
      wx.forEach(x => hl.push(Math.abs(hh + (- gradient + girderPoint.gradientY) * x)));
      let hpt = [];
      let wpt = [];
      const constant = [-3, 3, 3, -3]; //루프계산을 위한 계수 모음, 헌치의 기울기 : 밑변/높이비
      for (let i = 0; i < wx.length; i++) {
          hpt.push({ x: wx[i] + hl[i] * constant[i], y: - ps.slabThickness + girderPoint.gradientY * (wx[i] + hl[i] * constant[i]) });
          wpt.push({ x: wx[i], y: - topY + gradient * (wx[i]) });
      }
      if (wx[1] > wx[3]) {   //임시로 작성한 내용, 개구 폐합에서는 잘못된 3차원 메쉬가 생성됨 200602 by drlim
          wpt[1] = wpt[0];
          wpt[3] = wpt[2];

          
          hpt[1] = wpt[0];
          hpt[3] = wpt[2];
      }
      points = [...hpt, ...wpt];
      points.sort(function (a, b) { return a.x < b.x ? -1 : 1; });
      return points
  }

  function Point2DLength(point1, point2) {
      return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
  }

  function SectionPoint(){
    this.addInput("gridPoint","gridPoint");
    this.addInput("girderBaseInfo","girderBaseInfo");
    this.addInput("slabInfo","slabInfo");
    this.addInput("slabLayout","arr");
    this.addOutput("sectionPointDict","sectionPointDict");
  }

  SectionPoint.prototype.onExecute = function() {
    const gridPoint = this.getInputData(0);
    const girderBaseInfo = this.getInputData(1);
    const slabInfo = this.getInputData(2);
    const slabLayout = this.getInputData(3);
    let sectionPointDict = SectionPointDict(gridPoint,girderBaseInfo,slabInfo,slabLayout);
    this.setOutputData(0, sectionPointDict);
  };


  function DeckPoint(){
      this.addInput("masterLine","line");
      this.addInput("centerLineStation","centerLineStation");
      this.addInput("girderStation","girderStation");
      this.addInput("girderLayout","girderLayout");
      this.addInput("slabInfo","slabInfo");
      this.addInput("slabLayout","arr");
      this.addInput("girderBaseInfo","arr");
      this.addInput("pointDict","pointDict");
      this.addOutput("DeckPointDict","DeckPointDict");
      this.addOutput("DeckLinetDict","DeckLineDict");
    }

    DeckPoint.prototype.onExecute = function(){
      let deck = DeckSectionPoint(
        this.getInputData(0),
        this.getInputData(1),
        this.getInputData(2),
        this.getInputData(3),
        this.getInputData(4),
        this.getInputData(5),
        this.getInputData(6),
        this.getInputData(7)
      );
      this.setOutputData(0,deck.deckPointDict);
      this.setOutputData(1,deck.deckLineDict);
    };

  function FilletPoints(plate1, plate2, isForward, radius, smoothness) {
    let filletPoint = [[], [], [], []];

    let plt1 = isForward ? plate1 : plate2;
    let plt2 = isForward ? plate2 : plate1;
    let result = [[], []];

    for (let ii = 0; ii < 2; ii++) {
      let p1 = new global.THREE.Vector3(plt1[0][ii + 1].x, plt1[0][ii + 1].y, plt1[0][ii + 1].z);
      let p2 = new global.THREE.Vector3(plt2[0][ii + 1].x, plt2[0][ii + 1].y, plt2[0][ii + 1].z);
      let p3 = new global.THREE.Vector3(plt2[1][ii + 1].x, plt2[1][ii + 1].y, plt2[1][ii + 1].z);
      filletPoint[ii] = fillet3D(p1, p2, p3, radius, smoothness);
    }
    for (let ii = 0; ii < 2; ii++) {
      let p1 = new global.THREE.Vector3(plt1[1][ii + 1].x, plt1[1][ii + 1].y, plt1[1][ii + 1].z);
      let p2 = new global.THREE.Vector3(plt2[1][ii + 1].x, plt2[1][ii + 1].y, plt2[1][ii + 1].z);
      let p3 = new global.THREE.Vector3(plt2[0][ii + 1].x, plt2[0][ii + 1].y, plt2[0][ii + 1].z);
      filletPoint[ii + 2] = fillet3D(p1, p2, p3, radius, smoothness);
    }
    for (let jj = 0; jj < smoothness + 2; jj++) {
      let kk = isForward ? jj : smoothness + 1 - jj;
      result[0].push(plt2[0][0]);
      result[0].push(filletPoint[0][kk]);
      result[0].push(filletPoint[1][kk]);
      result[0].push(plt2[0][3]);
      result[1].push(plt2[1][0]);
      result[1].push(filletPoint[2][kk]);
      result[1].push(filletPoint[3][kk]);
      result[1].push(plt2[1][3]);
    }
    return result
  }

  function FilletPoints2D(plate1, plate2, isForward, radius, smoothness) {
    let filletPoint = [[], []];

    let plt1 = isForward ? plate1 : plate2;
    let plt2 = isForward ? plate2 : plate1;
    let result = [[], []];

    for (let ii = 0; ii < 1; ii++) {
      let p1 = new global.THREE.Vector3(plt1[0][ii + 1].x, plt1[0][ii + 1].y, plt1[0][ii + 1].z);
      let p2 = new global.THREE.Vector3(plt2[0][ii + 1].x, plt2[0][ii + 1].y, plt2[0][ii + 1].z);
      let p3 = new global.THREE.Vector3(plt2[1][ii + 1].x, plt2[1][ii + 1].y, plt2[1][ii + 1].z);
      filletPoint[ii] = fillet3D(p1, p2, p3, radius, smoothness);
    }
    for (let ii = 0; ii < 1; ii++) {
      let p1 = new global.THREE.Vector3(plt1[1][ii + 1].x, plt1[1][ii + 1].y, plt1[1][ii + 1].z);
      let p2 = new global.THREE.Vector3(plt2[1][ii + 1].x, plt2[1][ii + 1].y, plt2[1][ii + 1].z);
      let p3 = new global.THREE.Vector3(plt2[0][ii + 1].x, plt2[0][ii + 1].y, plt2[0][ii + 1].z);
      filletPoint[ii + 1] = fillet3D(p1, p2, p3, radius, smoothness);
    }
    for (let jj = 0; jj < smoothness + 2; jj++) {
      let kk = isForward ? jj : smoothness + 1 - jj;
      result[0].push(plt2[0][0]);
      result[0].push(filletPoint[0][kk]);
      // result[0].push(filletPoint[1][kk])
      // result[0].push(plt2[0][3])
      result[1].push(plt2[1][0]);
      result[1].push(filletPoint[1][kk]);
      // result[1].push(filletPoint[3][kk])
      // result[1].push(plt2[1][3])
    }
    return result
  }


  function plateCompare(plate1, plate2) {
    let result = true;
    let err = 0.1;
    for (let i in plate1) {
      for (let j in plate1[i]) {
        if (plate2[i][j]) {
          if (Math.abs(plate1[i][j].x - plate2[i][j].x) > err ||
            Math.abs(plate1[i][j].y - plate2[i][j].y) > err
          ) {
            result = false; //오류발생, 값이 급격하게 차이나는 경우 입력하는 방법이 있어야함
          }
        } else {
          result = false;
        }
      }
    }
    return result
  }

  function webEntrance(wplate1, wplate2, isForward, entrance) {
    let result = [[], [], []];
    // let b1 = 300;
    // let h1 = 1100;
    // let d1 = 250;
    // let r = 150;
    let b1 = entrance.b1;
    let h1 = entrance.h1;
    let d1 = entrance.d1;
    let r = entrance.r;
    let smoothness = 8;
    // let wplate1 = [];
    // let wplate2 = [];
    // L1.forEach(element => wplate1.push(ToGlobalPoint(point1, element)))
    // L2.forEach(element => wplate2.push(ToGlobalPoint(point2, element)))
    let dpt0 = DividingPoint(wplate1[0], wplate2[0], d1);
    let dpt1 = DividingPoint(wplate1[1], wplate2[1], d1);
    let dpt2 = DividingPoint(wplate1[2], wplate2[2], d1);
    let dpt3 = DividingPoint(wplate1[3], wplate2[3], d1);
    let l1 = DividingPoint(wplate1[0], wplate1[1], b1 + h1);
    let l2 = DividingPoint(wplate1[3], wplate1[2], b1 + h1);
    let r1 = DividingPoint(wplate1[0], wplate1[1], b1);
    let r2 = DividingPoint(wplate1[3], wplate1[2], b1);
    let l11 = DividingPoint(dpt0, dpt1, b1 + h1);
    let l21 = DividingPoint(dpt3, dpt2, b1 + h1);
    let r11 = DividingPoint(dpt0, dpt1, b1);
    let r21 = DividingPoint(dpt3, dpt2, b1);

    let newPlate1 = [[wplate1[0], r1, r2, wplate1[3]], [wplate1[1], l1, l2, wplate1[2]], []];
    let newPlate2 = [[dpt0, r11, r21, dpt3], [dpt1, l11, l21, dpt2], []];
    if (isForward) {
      let filletPoints = FilletPoints(newPlate1, newPlate2, isForward, r, smoothness);
      result[0].push(wplate1[0], r1, r2, wplate1[3]);
      result[0].push(...filletPoints[0]);
      result[1].push(wplate1[1], l1, l2, wplate1[2]);
      result[1].push(...filletPoints[1]);
    }
    else {
      let filletPoints = FilletPoints(newPlate2, newPlate1, isForward, r, smoothness);
      result[0].push(...filletPoints[0]);
      result[0].push(wplate1[0], r1, r2, wplate1[3]);
      result[1].push(...filletPoints[1]);
      result[1].push(wplate1[1], l1, l2, wplate1[2]);
    }
    // steelBoxDict[keyname]["points"][0].push(dpt0, r11, r21, dpt3)
    // steelBoxDict[keyname]["points"][1].push(dpt1, l11, l21, dpt2)
    result[2].push(dpt0, dpt1, dpt2, dpt3);
    return result
  }

  function webEntrance2D(wplate1, wplate2, isForward, entrance) {
    let result = [[], [], []];
    // let b1 = 300;
    // let h1 = 1100;
    // let d1 = 250;
    // let r = 150;
    let b1 = entrance.b1;
    let h1 = entrance.h1;
    let d1 = entrance.d1;
    let r = entrance.r;

    let smoothness = 8;
    // let wplate1 = [];
    // let wplate2 = [];
    // L1.forEach(element => wplate1.push(ToGlobalPoint(point1, element)))
    // L2.forEach(element => wplate2.push(ToGlobalPoint(point2, element)))
    let dpt0 = DividingPoint(wplate1[0], wplate2[0], d1);
    let dpt1 = DividingPoint(wplate1[1], wplate2[1], d1);
    // let dpt2 = DividingPoint(wplate1[2], wplate2[2], d1)
    // let dpt3 = DividingPoint(wplate1[3], wplate2[3], d1)
    let l1 = DividingPoint(wplate1[0], wplate1[1], b1 + h1);
    // let l2 = DividingPoint(wplate1[3], wplate1[2], b1 + h1)
    let r1 = DividingPoint(wplate1[0], wplate1[1], b1);
    // let r2 = DividingPoint(wplate1[3], wplate1[2], b1)
    let l11 = DividingPoint(dpt0, dpt1, b1 + h1);
    // let l21 = DividingPoint(dpt3, dpt2, b1 + h1)
    let r11 = DividingPoint(dpt0, dpt1, b1);
    // let r21 = DividingPoint(dpt3, dpt2, b1)

    let newPlate1 = [[wplate1[0], r1], [wplate1[1], l1], []];
    let newPlate2 = [[dpt0, r11], [dpt1, l11], []];
    if (isForward) {
      let filletPoints = FilletPoints2D(newPlate1, newPlate2, isForward, r, smoothness);
      result[0].push(wplate1[0], r1);
      result[0].push(...filletPoints[0]);
      result[1].push(wplate1[1], l1);
      result[1].push(...filletPoints[1]);
    }
    else {
      let filletPoints = FilletPoints2D(newPlate2, newPlate1, isForward, r, smoothness);
      result[0].push(...filletPoints[0]);
      result[0].push(wplate1[0], r1);
      result[1].push(...filletPoints[1]);
      result[1].push(wplate1[1], l1);
    }
    // steelBoxDict[keyname]["points"][0].push(dpt0, r11, r21, dpt3)
    // steelBoxDict[keyname]["points"][1].push(dpt1, l11, l21, dpt2)
    result[2].push(dpt0, dpt1);
    return result
  }



  function sideWebGenerator(sectionPointDict, pk1, pk2, point1, point2, sideKey, splicer, endCutFilletR, entrance) {
    let result = [[], [], []];
    let uf0 = sectionPointDict[pk1].backward[sideKey];
    let uf1 = sectionPointDict[pk1].forward[sideKey];
    let uf2 = sectionPointDict[pk2].backward[sideKey];
    let uf3 = sectionPointDict[pk2].forward[sideKey];
    let FisB = uf2[0] === uf3[0]; //기준높이가 변화하는 경우
    let spCheck = false;
    splicer.forEach(function (sp) { if (pk2.substr(2, 2) === sp) { spCheck = true; } });

    let plate0 = [[], [], [
      { x: point1.girderStation, y: point1.z + uf0[0], z: 0 },
      { x: point1.girderStation, y: point1.z + uf0[1], z: 0 }
    ]];
    let plate1 = [[], [], [
      { x: point1.girderStation, y: point1.z + uf1[0], z: 0 },
      { x: point1.girderStation, y: point1.z + uf1[1], z: 0 }
    ]];
    let plate2 = [[], [], [
      { x: point2.girderStation, y: point2.z + uf2[0], z: 0 },
      { x: point2.girderStation, y: point2.z + uf2[1], z: 0 }
    ]];
    let plate3 = [[], [], [
      { x: point2.girderStation, y: point2.z + uf3[0], z: 0 },
      { x: point2.girderStation, y: point2.z + uf3[1], z: 0 }
    ]];

    if (pk1.substr(2, 2) === "K1" && entrance.add) {
      let ent = webEntrance2D(plate1[2], plate2[2], true, entrance);
      for (let k in ent) {
        ent[k].forEach(element => result[k].push(element));
      }
    } else {
      if (uf1[0] - uf0[0] > 100 && uf1[0] - uf0[0] < 700) {
        let filletList = [];
        let radius = endCutFilletR;
        filletList.push(...fillet3D(plate0[2][0], plate1[2][0], plate2[2][0], radius, 8));

        for (let l in filletList) {
          result[2].push(filletList[l], plate1[2][1]);
        }
        // result[2].push(plate3[2][0], plate3[2][1]);
      } else {
        for (let k in plate1) {
          plate1[k].forEach(element => result[k].push(element));
        }
      }

    }
    if (!FisB || spCheck) {
      if (pk2.substr(2, 2) === "K6" && entrance.add) {
        let ent = webEntrance2D(plate2[2], plate1[2], false, entrance);
        for (let k in ent) {
          ent[k].forEach(element => result[k].push(element));
        }
      }
      else {
        if (uf2[0] - uf3[0] > 100 && uf2[0] - uf3[0] < 700) {
          let filletList = [];
          let radius = endCutFilletR;
          filletList.push(...fillet3D(plate1[2][0], plate2[2][0], plate3[2][0], radius, 8));

          for (let l in filletList) {
            result[2].push(filletList[l], plate3[2][1]);
          }
          // result[2].push(plate3[2][0], plate3[2][1]);
        } else {
          for (let k in plate1) {
            plate2[k].forEach(element => result[k].push(element));
          }
        }
      }
    }
    return result
  }


  function sidePlateGenerator(sectionPointDict, pk1, pk2, point1, point2, sideKey, splicer, endCutFilletR) {
    // 박스형 거더의 상하부플레이트 개구와 폐합에 대한 필렛을 위해 개발되었으며, 개구->폐합, 폐합->개구에 대해서만 가능하다, 
    // 개구->폐합->개구로 2단계의 경우에는 오류가 발생할 수 있음, 2020.05.25 by drlim
    let result = [[], [], []];
    // let uf0 = sectionPointDict[pk1].backward["input"];
    let uf0 = sectionPointDict[pk1].backward[sideKey];
    let uf1 = sectionPointDict[pk1].forward[sideKey];
    let uf2 = sectionPointDict[pk2].backward[sideKey];
    let uf3 = sectionPointDict[pk2].forward[sideKey];
    let FisB = uf2[0] === uf3[0]; //기준높이가 변화하는 경우
    // let FisB0 = uf0[0] === uf1[0]; //기준높이가 변화하는 경우

    let plate0 = [[], [], [
      { x: point1.girderStation, y: point1.z + uf0[0], z: 0 },
      { x: point1.girderStation, y: point1.z + uf0[1], z: 0 }
    ]];
    let plate1 = [[], [], [
      { x: point1.girderStation, y: point1.z + uf1[0], z: 0 },
      { x: point1.girderStation, y: point1.z + uf1[1], z: 0 }
    ]];
    let plate2 = [[], [], [
      { x: point2.girderStation, y: point2.z + uf2[0], z: 0 },
      { x: point2.girderStation, y: point2.z + uf2[1], z: 0 }
    ]];
    let plate3 = [[], [], [
      { x: point2.girderStation, y: point2.z + uf3[0], z: 0 },
      { x: point2.girderStation, y: point2.z + uf3[1], z: 0 }
    ]];

    if ((uf1[0] - uf0[0]) > 100 && (uf1[0] - uf0[0]) < 700) {
      let thickness = Math.abs(uf1[0] - uf1[1]);
      let npt2 = DividingPoint(plate1[2][0], plate2[2][0], thickness);
      let npt3 = DividingPoint(plate1[2][1], plate2[2][1], thickness);
      let nplate1 = plate0[2][1];
      let nplate2 = { x: npt2.x, y: plate0[2][1].y, z: 0 };
      let filletList = [[], []];
      let radius = endCutFilletR;
      filletList[0].push(...fillet3D(nplate1, plate1[2][0], plate2[2][0], radius, 8));
      radius = endCutFilletR - thickness;
      filletList[1].push(...fillet3D(nplate2, npt3, plate2[2][1], radius, 8));
      result[2].push(nplate1, nplate2);
      for (let l in filletList[0]) {
        result[2].push(filletList[0][l], filletList[1][l]);
      }
    } else {
      for (let k in plate1) {
        plate1[k].forEach(element => result[k].push(element));
      }
    }
    let spCheck = false;
    splicer.forEach(function (sp) { if (pk2.substr(2, 2) === sp) { spCheck = true; } });
    if (!FisB || spCheck) {  //형고 높이가 100mm 이상인 경우에만 반영
      if ((uf2[0] - uf3[0]) > 100 && (uf2[0] - uf3[0]) < 700) {

        let thickness = Math.abs(uf2[0] - uf2[1]);
        let npt2 = DividingPoint(plate2[2][0], plate1[2][0], thickness);
        let npt3 = DividingPoint(plate2[2][1], plate1[2][1], thickness);
        let nplate1 = plate3[2][1];
        let nplate2 = { x: npt2.x, y: plate3[2][1].y, z: 0 };
        let filletList = [[], []];
        let radius = endCutFilletR;
        filletList[0].push(...fillet3D(plate1[2][0], plate2[2][0], nplate1, radius, 8));
        radius = endCutFilletR - thickness;
        filletList[1].push(...fillet3D(plate1[2][1], npt3, nplate2, radius, 8));

        for (let l in filletList[0]) {
          result[2].push(filletList[0][l], filletList[1][l]);
        }
        result[2].push(nplate1, nplate2);
      } else {
        for (let k in plate2) {
          plate2[k].forEach(element => result[k].push(element));
        }
      }



    }
    return result
  }

  function steelPlateGenerator(sectionPointDict, pk1, pk2, point1, point2, plateKey, splicer, endCutFilletR) {
    // 박스형 거더의 상하부플레이트 개구와 폐합에 대한 필렛을 위해 개발되었으며, 개구->폐합, 폐합->개구에 대해서만 가능하다, 
    // 개구->폐합->개구로 2단계의 경우에는 오류가 발생할 수 있음, 2020.05.25 by drlim

    let result = [[], [], []];
    let filletR = 300; // 외부변수로 나와야함

    let uf0 = sectionPointDict[pk1].backward[plateKey];
    let uf1 = sectionPointDict[pk1].forward[plateKey];
    let uf2 = sectionPointDict[pk2].backward[plateKey];
    let uf3 = sectionPointDict[pk2].forward[plateKey];
    let FisB = plateCompare(uf2, uf3);  //forward is backward?  
    let FisB0 = plateCompare(uf0, uf1);  //forward is backward?  
    let plate0 = [[], [], []];
    let plate1 = [[], [], []];
    let plate2 = [[], [], []];
    let plate3 = [[], [], []];
    let smoothness = 8;
    let former1 = uf0[0][0] ? uf0[0][0].x : uf0[2][0].x;
    let latter1 = uf1[0][0] ? uf1[0][0].x : uf1[2][0].x;
    let former2 = uf2[0][0] ? uf2[0][0].x : uf2[2][0].x;
    let latter2 = uf3[0][0] ? uf3[0][0].x : uf3[2][0].x;

    let former3 = uf2[0].length>0 ? uf2[0][0].y : uf2[2][0].y;
    let latter3 = uf3[0].length>0 ? uf3[0][0].y : uf3[2][0].y;
    let former0 = uf0[0][0] ? uf0[0][0].y : uf0[2][0].y;
    let latter0 = uf1[0][0] ? uf1[0][0].y : uf1[2][0].y;

    for (let k in uf1) {
      uf0[k].forEach(element => plate0[k].push(ToGlobalPoint(point1, element)));
      uf1[k].forEach(element => plate1[k].push(ToGlobalPoint(point1, element)));
      uf2[k].forEach(element => plate2[k].push(ToGlobalPoint(point2, element)));
      uf3[k].forEach(element => plate3[k].push(ToGlobalPoint(point2, element)));
    }
    // outborder 
    if (!plateCompare(uf0, uf1)) {
      if (former1 < latter1) {
        if (uf1[2][0]) {
          plate1[2][0] = DividingPoint(plate1[2][0], plate2[2][0], (latter1 - former1) * 2); //숫자 2는 확폭시 경사도
          plate1[2][1] = DividingPoint(plate1[2][1], plate2[2][1], (latter1 - former1) * 2);
          plate1[2][2] = DividingPoint(plate1[2][2], plate2[2][2], (latter1 - former1) * 2);
          plate1[2][3] = DividingPoint(plate1[2][3], plate2[2][3], (latter1 - former1) * 2);
          if (!uf0[2][0]) {
            plate0[2][0] = plate0[0][0];
            plate0[2][1] = plate0[1][0];
            plate0[2][2] = plate0[1][3];
            plate0[2][3] = plate0[0][3];
            plate0[0] = [];
            plate0[1] = [];
          }
        }
        for (let k in uf1) {
          plate0[k].forEach(element => result[k].push(element));
        }
      }
      
    }
    
    if (uf1[2].length === 0 && uf0[2].length > 0) {  //폐합에서 분할로 시작 // 외측과 내측필렛이 같은요소에 작용하면 오류가 발생할 것으로 예상, 필렛이 없는 폐합요소에만 외측 챔퍼 적용
      let filletPoints = FilletPoints(plate1, plate2, false, filletR, smoothness);
      
      result[0].push(...filletPoints[0]);
      result[1].push(...filletPoints[1]);
      result[2].push(...plate0[2]);
    } else {
      if (!FisB0 && ((latter0 - former0) > 100) && ((latter0 - former0) < 700)) { //단부에서 오류나는 내용 임시적으로 해결 2020.7.13 by dr.lim
        for (let k in uf1) {
          if (uf1[k].length > 0) {
            let thickness = Math.abs(uf1[k][0].y - uf1[k][3].y);
            let npt2 = DividingPoint(plate1[k][2], plate2[k][2], thickness);
            let npt3 = DividingPoint(plate1[k][3], plate2[k][3], thickness);
            let nplate1 = [plate1[k][0], plate1[k][1], npt2, npt3];
            let nplate2 = [plate0[k][3], plate0[k][2], { x: npt2.x, y: npt2.y, z: plate0[k][2].z }, { x: npt3.x, y: npt3.y, z: plate0[k][3].z }];
            let filletList = [[], [], [], []];
            for (let l = 0; l < 4; l++) {
              let radius = l < 2 ? endCutFilletR : endCutFilletR - thickness;
              filletList[l].push(...fillet3D(nplate2[l], nplate1[l], plate2[k][l], radius, 8));
            }
            result[k].push(...nplate2);
            for (let l in filletList[0]) {
              result[k].push(filletList[0][l], filletList[1][l], filletList[2][l], filletList[3][l]);
            }
            // result[k].push(plate2[k][0],plate2[k][1],npt2, npt3)
          }
        }
      } else {
        for (let k in uf1) {
          plate1[k].forEach(element => result[k].push(element));
        }
      }
    }
    if (uf2[2].length === 0 && uf3[2].length > 0) {
      let filletPoints = FilletPoints(plate1, plate2, true, filletR, smoothness);
      result[0].push(...filletPoints[0]);
      result[1].push(...filletPoints[1]);
    } else {
      let spCheck = false;
      splicer.forEach(function (sp) { if (pk2.substr(2, 2) === sp) { spCheck = true; } });
      if (spCheck) {  //형고 높이가 100mm 이상인 경우에만 반영
        for (let k in uf2) {
          plate2[k].forEach(element => result[k].push(element));
        }
      }
      if (!FisB && ((former3 - latter3) > 100) && ((former3 - latter3) < 700)) { //단부에서 오류나는 내용 임시적으로 해결 2020.7.13 by dr.lim
        for (let k in uf2) {
          if (uf2[k].length > 0) {
            let thickness = Math.abs(uf2[k][0].y - uf2[k][3].y);
            let npt2 = DividingPoint(plate2[k][2], plate1[k][2], thickness);
            let npt3 = DividingPoint(plate2[k][3], plate1[k][3], thickness);
            let nplate1 = [plate2[k][0], plate2[k][1], npt2, npt3];
            let nplate2 = [plate3[k][3], plate3[k][2], { x: npt2.x, y: npt2.y, z: plate3[k][2].z }, { x: npt3.x, y: npt3.y, z: plate3[k][3].z }];
            let filletList = [[], [], [], []];
            for (let l = 0; l < 4; l++) {
              let radius = l < 2 ? endCutFilletR : endCutFilletR - thickness;
              filletList[l].push(...fillet3D(plate1[k][l], nplate1[l], nplate2[l], radius, 8));
            }
            for (let l in filletList[0]) {
              result[k].push(filletList[0][l], filletList[1][l], filletList[2][l], filletList[3][l]);
            }
            // result[k].push(plate2[k][0],plate2[k][1],npt2, npt3)
            result[k].push(...nplate2);
          }
        }
      }

    }
    if (!FisB) {
      if (former2 > latter2 && pk2.substr(2, 2) !== "K6") {
        if (uf2[2][0]) {
          plate2[2][0] = DividingPoint(plate2[2][0], plate1[2][0], (former2 - latter2) * 2);
          plate2[2][1] = DividingPoint(plate2[2][1], plate1[2][1], (former2 - latter2) * 2);
          plate2[2][2] = DividingPoint(plate2[2][2], plate1[2][2], (former2 - latter2) * 2);
          plate2[2][3] = DividingPoint(plate2[2][3], plate1[2][3], (former2 - latter2) * 2);
          if (!uf3[2][0]) {
            plate3[2][0] = plate3[0][0];
            plate3[2][1] = plate3[1][0];
            plate3[2][2] = plate3[1][3];
            plate3[2][3] = plate3[0][3];
            plate3[0] = [];
            plate3[1] = [];
          }
        }
        for (let k in uf2) {
          plate2[k].forEach(element => result[k].push(element));
        }
        for (let k in uf2) {
          plate3[k].forEach(element => result[k].push(element));
        }
      }
    }
    return result
  }

  function SteelBoxDict2(girderStationList, sectionPointDict, entrance) {
    let steelBoxDict = {};
    let pk1 = "";
    let pk2 = "";
    let UFi = 1;
    let Bi = 1;
    let Wi = 1;
    // let RWi = 1;
    let lRibi = 1;
    let uRibi = 1;

    let keyname = "";
    let splicer = [];
    let sideKeyname = "";
    let endCutFilletR = 200;

    for (let i in girderStationList) {
      for (let j = 0; j < girderStationList[i].length - 1; j++) {

        let point1 = girderStationList[i][j].point;
        let point2 = girderStationList[i][j + 1].point;
        pk1 = girderStationList[i][j].key;
        pk2 = girderStationList[i][j + 1].key;

        let L0 = [];
        let L1 = []; //sectionPointDict[pk1].forward.leftTopPlate
        let L2 = []; //sectionPointDict[pk2].backward.leftTopPlate
        let L3 = []; //sectionPointDict[pk2].forward.leftTopPlate
        // let R1 = sectionPointDict[pk1].forward.rightTopPlate
        // let R2 = sectionPointDict[pk2].backward.rightTopPlate
        // let R3 = sectionPointDict[pk2].forward.rightTopPlate
        let FisB = true;  //forward is backward?  

        keyname = "G" + (i * 1 + 1).toString() + "TopPlate" + UFi;
        if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
        sideKeyname = "G" + (i * 1 + 1).toString() + "TopSide" + UFi;
        if (!steelBoxDict[sideKeyname]) { steelBoxDict[sideKeyname] = { points: [[], [], []] }; }
        splicer = ["TF", "SP", "K6"];
        let uflangePoint = steelPlateGenerator(sectionPointDict, pk1, pk2, point1, point2, "uflange", splicer, endCutFilletR);
        for (let k in uflangePoint) {
          uflangePoint[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
        }
        let uflangeSide = sidePlateGenerator(sectionPointDict, pk1, pk2, point1, point2, "uflangeSide", splicer, endCutFilletR);
        for (let k in uflangeSide) {
          uflangeSide[k].forEach(element => steelBoxDict[sideKeyname]["points"][k].push(element));
        }
        splicer.forEach(function (sp) { if (pk2.substr(2, 2) === sp) { 
          UFi += 1; return } });
        // pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") { UFi += 1 }


        keyname = "G" + (i * 1 + 1).toString() + "BottomPlate" + Bi;
        if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
        sideKeyname = "G" + (i * 1 + 1).toString() + "BottomSide" + Bi;
        if (!steelBoxDict[sideKeyname]) { steelBoxDict[sideKeyname] = { points: [[], [], []] }; }
        splicer = ["BF", "SP", "K6"];
        let lflangePoint = steelPlateGenerator(sectionPointDict, pk1, pk2, point1, point2, "lflange", splicer, endCutFilletR);
        for (let k in lflangePoint) {
          lflangePoint[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
        }
        let lflangeSide = sidePlateGenerator(sectionPointDict, pk1, pk2, point1, point2, "lflangeSide", splicer, endCutFilletR);
        for (let k in lflangeSide) {
          lflangeSide[k].forEach(element => steelBoxDict[sideKeyname]["points"][k].push(element));
        }
        splicer.forEach(function (sp) { if (pk2.substr(2, 2) === sp) { Bi += 1; return } });

        sideKeyname = "G" + (i * 1 + 1).toString() + "WebSide" + Wi;
        if (!steelBoxDict[sideKeyname]) { steelBoxDict[sideKeyname] = { points: [[], [], []] }; }
        splicer = ["WF", "SP", "K6"];
        let webSide = sideWebGenerator(sectionPointDict, pk1, pk2, point1, point2, "webSide", splicer, endCutFilletR, entrance);
        for (let k in webSide) {
          webSide[k].forEach(element => steelBoxDict[sideKeyname]["points"][k].push(element));
        }

        for (let l = 0; l < 2; l++) {

          keyname = l === 0 ? "G" + (i * 1 + 1).toString() + "LeftWeB" + Wi : keyname = "G" + (i * 1 + 1).toString() + "RightWeB" + Wi;
          if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
          L0 = sectionPointDict[pk1].backward.web[l];
          L1 = sectionPointDict[pk1].forward.web[l];
          L2 = sectionPointDict[pk2].backward.web[l];
          L3 = sectionPointDict[pk2].forward.web[l];

          let wplate0 = [];
          let wplate1 = [];
          let wplate2 = [];
          let wplate3 = [];
          L0.forEach(element => wplate0.push(ToGlobalPoint(point1, element)));
          L1.forEach(element => wplate1.push(ToGlobalPoint(point1, element)));
          L2.forEach(element => wplate2.push(ToGlobalPoint(point2, element)));
          L3.forEach(element => wplate3.push(ToGlobalPoint(point2, element)));
          if (pk1.substr(2, 2) === "K1" && entrance.add) {
            let ent = webEntrance(wplate1, wplate2, true, entrance);
            for (let k in ent) {
              ent[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
            }
          } else {
            let indent = (L1[0].y - L0[0].y); // bottom point of web
            if (indent > 100 && indent < 700) {
              let fpt = fillet3D(wplate0[0], wplate1[0], wplate2[0], endCutFilletR, 8);
              let fpt3 = fillet3D(wplate0[3], wplate1[3], wplate2[3], endCutFilletR, 8);
              for (let l in fpt) {
                steelBoxDict[keyname]["points"][2].push(fpt[l], wplate1[1], wplate1[2], fpt3[l]);
              }
            } else {
              // L1.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point1, element)))
              wplate1.forEach(element => steelBoxDict[keyname]["points"][2].push(element));
            }



          }
          FisB = true;
          for (let i in L2) { if (L2[i] !== L3[i]) { FisB = false; } }
          if (!FisB || pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
            if (pk2.substr(2, 2) === "K6" && entrance.add) {
              let ent = webEntrance(wplate2, wplate1, false, entrance);
              for (let k in ent) {
                ent[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
              }
            }
            else {
              let indent = (L2[0].y - L3[0].y); // bottom point of web
              if (indent > 100 && indent < 700) {
                let fpt = fillet3D(wplate1[0], wplate2[0], wplate3[0], endCutFilletR, 8);
                let fpt3 = fillet3D(wplate1[3], wplate2[3], wplate3[3], endCutFilletR, 8);
                for (let l in fpt) {
                  steelBoxDict[keyname]["points"][2].push(fpt[l], wplate2[1], wplate2[2], fpt3[l]);
                }
              } else {
                wplate2.forEach(element => steelBoxDict[keyname]["points"][2].push(element));
              }
            }
          }
        }
        if (pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP") { Wi += 1; }

        // let lRibList = [];
        // let uRibList = [];
        // for (let ii in sectionPointDict[pk1].forward) {
        //   if (ii.includes("lRib")){
        //     lRibList.push(ii);
        //   } else if (ii.includes("uRib")){
        //     uRibList.push(ii);
        //   }
        // }


        // for (let Ribkey of lRibList) {
          keyname = "G" + (i * 1 + 1).toString() + "lRib" + lRibi;
          
          L1 = sectionPointDict[pk1].forward.LRib;
          L2 = sectionPointDict[pk2].backward.LRib;
          L3 = sectionPointDict[pk2].forward.LRib;
          if (!steelBoxDict[keyname] && L1.length > 0) { 
            steelBoxDict[keyname] = { points: [] }; 
            L1.forEach( elem => steelBoxDict[keyname].points.push([]) );
          }        for (let k in L1 ){
            L1[k].forEach(element => steelBoxDict[keyname]["points"][k].push(ToGlobalPoint(point1, element)));
          }
          // FisB = true;
          // for (let i in L2) { FisB = L3 ? (L2[i] !== L3[i] ? false : true) : false }
          // console.log("check", pk1, pk2, FisB, L3)
          if (L3 == false || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6" ) {
            for (let k in L2){
              L2[k].forEach(element => steelBoxDict[keyname]["points"][k].push(ToGlobalPoint(point2, element)));
            }
            lRibi += 1;
          }
        // }
        
        // Ribi = 1;
        // for (let Ribkey of uRibList) {
          keyname = "G" + (i * 1 + 1).toString() + "uRib" + uRibi;
          // if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; };
          L1 = sectionPointDict[pk1].forward.URib;
          L2 = sectionPointDict[pk2].backward.URib;
          L3 = sectionPointDict[pk2].forward.URib;
          if (!steelBoxDict[keyname] && L1.length > 0) { 
            steelBoxDict[keyname] = { points: [] }; 
            L1.forEach( elem => steelBoxDict[keyname].points.push([]) );
          }        for (let k in L1 ){
            L1[k].forEach(element => steelBoxDict[keyname]["points"][k].push(ToGlobalPoint(point1, element)));
          }
          
          // L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)));
          // FisB = true;
          // for (let i in L2) { FisB = L3 ? (L2[i] !== L3[i] ? false : true) : false }
          if (L3 == false || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
            for (let k in L2){
              L2[k].forEach(element => steelBoxDict[keyname]["points"][k].push(ToGlobalPoint(point2, element)));
            }
            // L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)));
            uRibi += 1;
          }
        // }
      }
    }
    return steelBoxDict
  }


  function fillet3D(point1, point2, point3, radius, smoothness) {
    // let points = [point1, point2, point3]
    let newPoints = [];
    let v1 = new global.THREE.Vector3();
    let v2 = new global.THREE.Vector3();
    let v3 = new global.THREE.Vector3();
    let vc1 = new global.THREE.Vector3();
    let vc2 = new global.THREE.Vector3();
    let center = new global.THREE.Vector3();
    let ang;
    let l1;

    v1.subVectors(point1, point2).normalize();
    v2.subVectors(point3, point2).normalize();
    ang = Math.acos(v1.dot(v2));
    l1 = radius / Math.sin(ang / 2);
    v3.addVectors(v1, v2).setLength(l1);
    center.addVectors(point2, v3);
    let p1 = new global.THREE.Vector3().addVectors(point2, v1.multiplyScalar(radius / Math.tan(ang / 2)));
    let p2 = new global.THREE.Vector3().addVectors(point2, v2.multiplyScalar(radius / Math.tan(ang / 2)));
    vc1.subVectors(p1, center);
    vc2.subVectors(p2, center);

    newPoints.push(p1);
    for (let j = 0; j < smoothness; j++) {
      let dirVec = new global.THREE.Vector3().addVectors(vc1.clone().multiplyScalar(smoothness - j), vc2.clone().multiplyScalar(j + 1)).setLength(radius);
      newPoints.push(new global.THREE.Vector3().addVectors(center, dirVec));
    }
    newPoints.push(p2);
    //let line2 = new THREE.Line(newGeometry,line.material);
    //scene.add(line2)
    return newPoints;
  }

  // import { sceneAdder } from "global";

  function SteelBox(){
    this.addInput("girderStation","girderStation");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("entrance","entrance");
    this.addOutput("steelBoxDict","steelBoxDict");
  }

  SteelBox.prototype.onExecute = function() {
    this.setOutputData(0, SteelBoxDict2(this.getInputData(0), this.getInputData(1), this.getInputData(2)));
  };

  // Cy, Cz 0: left, bottom 1: center, 2: right, top
  function PTS(name, Yinverse, Cy, sectionDB) {
      let pts = [0, 0, 0, 0, 0, 0];
      let base = 0;
      switch (Cy) {
          case 0:
              base = Yinverse ? sectionDB[name].shape[1] : 0;
              break;
          case 1:
              base = Yinverse ? sectionDB[name].Cy : -sectionDB[name].Cy;
              break;
          case 2:
              base = Yinverse ? 0 : - sectionDB[name].shape[1];
              break;
          default:
              base = 0;
      }
      let sign = Yinverse ? 1 : -1;
      if (sectionDB[name].type === "L") {
          pts[0] = base;
          pts[1] = base - sign * sectionDB[name].shape[2];
          pts[2] = pts[1];
          pts[3] = base - sign * sectionDB[name].shape[1];
          pts[4] = sectionDB[name].shape[0];
          pts[5] = sectionDB[name].shape[3];
      } else if (sectionDB[name].type === "T") {
          pts[0] = base - sign * sectionDB[name].shape[1];
          pts[1] = base;
          pts[2] = base - sign * sectionDB[name].Cy - sign * sectionDB[name].shape[2]/2;
          pts[3] = base - sign * sectionDB[name].Cy + sign * sectionDB[name].shape[2]/2;
          pts[4] = -sectionDB[name].shape[3];
          pts[5] = -sectionDB[name].shape[0];
      }
      // 각 형강에 대한 결과 순서가 통일성이 없음 추후 수정 바람 20.03.25 by drlim
      return pts
  }

  function SplicePlate(iPoint, iSectionPoint) {
    let result = {};

    let sp = {
      webThickness: iSectionPoint.input.tw,
      uflangeWidth: iSectionPoint.input.wuf,
      lflangeWidth: iSectionPoint.input.luf,
      uflangeThickness: iSectionPoint.input.tuf,
      lflangeThickness: iSectionPoint.input.tlf,
    };
    let xs = {
      webJointThickness: 20,
      webJointWidth: 600,
      webJointHeight: iSectionPoint.input.H - 100,
      uflangeJointThickness: 20,
      lflangeJointThickness: 20,
      // flangeJointLength: 500,
      uflangeJointLength: 600,
      lflangeJointLength: 600,
      margin2: 20, //종방향 부재와의 간격
    };

    let wBolt = {
      P: 100,
      G: 100,
      size: 37,
      dia : 22,
      t: 14,
    };

    let fBolt = {
      P: 75,
      G: 75,
      size: 37,
      dia : 22,
      t: 14,
    };
    let gradient = (iSectionPoint.web[1][1].y - iSectionPoint.web[0][1].y) / (iSectionPoint.web[1][1].x - iSectionPoint.web[0][1].x);

    let Web = [{ x: -xs.webJointHeight / 2, y: - xs.webJointWidth / 2 },
    { x: -xs.webJointHeight / 2, y: xs.webJointWidth / 2 },
    { x: xs.webJointHeight / 2, y: xs.webJointWidth / 2 },
    { x: xs.webJointHeight / 2, y: - xs.webJointWidth / 2 }];
    let WebBolt = {
      P: wBolt.P, G: wBolt.G, size: wBolt.size, dia: wBolt.dia, t: wBolt.t, l: xs.webJointThickness * 2 + sp.webThickness,
      layout: BoltLayout(wBolt.G, wBolt.P, "x", Web), isUpper: true
    };
    let iNode = [iSectionPoint.web[0][0], iSectionPoint.web[1][0]];
    let jNode = [iSectionPoint.web[0][1], iSectionPoint.web[1][1]];
    let lcp = { x: (iNode[0].x + jNode[0].x) / 2, y: (iNode[0].y + jNode[0].y) / 2 };
    let rcp = { x: (iNode[1].x + jNode[1].x) / 2, y: (iNode[1].y + jNode[1].y) / 2 };
    let cp = - gradient / 2 * lcp.x + lcp.y;

    for (let i = 0; i < 2; i++) {
      // let iNode = iSectionPoint.web[i][0]
      // let jNode = iSectionPoint.web[i][1]
      let centerPoint = i === 0 ? ToGlobalPoint(iPoint, lcp) : ToGlobalPoint(iPoint, rcp);
      let lWebAngle = Math.PI - Math.atan((jNode[i].y - iNode[i].y) / (jNode[i].x - iNode[i].x));
      let partName = i === 0 ? "lWeb" : "rWeb";
      let side2D = i === 0 ? (cp - lcp.y) : false;
      result[partName] = hPlateGen(Web, centerPoint, xs.webJointThickness, sp.webThickness, 90, 0, lWebAngle, null, false, side2D);
      result[partName].bolt = WebBolt;
      result[partName + "2"] = hPlateGen(Web, centerPoint, xs.webJointThickness, - xs.webJointThickness, 90, 0, lWebAngle, null, false, false);
    }

    let uPoint = { x: 0, y: - iSectionPoint.web[0][1].x * gradient + iSectionPoint.web[0][1].y };
    let centerPoint = ToGlobalPoint(iPoint, uPoint);

    if (iSectionPoint.uflange[2].length > 0) { //폐합
      let lx1 = Math.sqrt((iSectionPoint.web[0][1].x - uPoint.x) ** 2 + (iSectionPoint.web[0][1].y - uPoint.y) ** 2);
      let lx2 = Math.sqrt((iSectionPoint.web[1][1].x - uPoint.x) ** 2 + (iSectionPoint.web[1][1].y - uPoint.y) ** 2);
      let sec = (lx1 + lx2) / (iSectionPoint.web[1][1].x - iSectionPoint.web[0][1].x);
      let TopFlange = [{ x: (-lx1 - iSectionPoint.input.buf), y: -xs.uflangeJointLength / 2 },
      { x: (-lx1 - iSectionPoint.input.buf), y: xs.uflangeJointLength / 2 },
      { x: (lx2 + iSectionPoint.input.buf), y: xs.uflangeJointLength / 2 },
      { x: (lx2 + iSectionPoint.input.buf), y: -xs.uflangeJointLength / 2 },];
      let side2D = [0, 1];
      let keyName = "cTop";
      result[keyName] = hPlateGen(TopFlange, centerPoint, xs.uflangeJointThickness, sp.uflangeThickness, 90, Math.atan(iPoint.gradientX), -Math.atan(gradient), null, true, side2D);
      let xList = [-lx1 - iSectionPoint.input.buf, -lx1 - sp.webThickness - xs.margin2,
      -lx1 + xs.margin2];
      for (let i in iSectionPoint.input.Urib.layout) {
        xList.push((iSectionPoint.input.Urib.layout[i] - iSectionPoint.input.Urib.thickness / 2) * sec - xs.margin2);
        xList.push((iSectionPoint.input.Urib.layout[i] + iSectionPoint.input.Urib.thickness / 2) * sec + xs.margin2);
      }    xList.push(lx2 - xs.margin2, lx2 + sp.webThickness + xs.margin2, lx2 + iSectionPoint.input.buf);
      for (let i = 0; i < xList.length; i += 2) {
        keyName = "cTop" + i;
        let TopFlange2 = [{ x: xList[i], y: -xs.uflangeJointLength / 2 }, { x: xList[i], y: xs.uflangeJointLength / 2 },
        { x: xList[i + 1], y: xs.uflangeJointLength / 2 }, { x: xList[i + 1], y: -xs.uflangeJointLength / 2 }];
        side2D = i === 0 ? [0, 1] : null;
        result[keyName] = hPlateGen(TopFlange2, centerPoint, xs.uflangeJointThickness, - xs.uflangeJointThickness, 90, Math.atan(iPoint.gradientX), -Math.atan(gradient), null, false, side2D);
        result[keyName].bolt = {
          P: fBolt.P, G: fBolt.G, size: fBolt.size, dia: fBolt.dia, t: fBolt.t, l: 2 * xs.uflangeJointThickness + sp.uflangeThickness,
          layout: BoltLayout(fBolt.G, fBolt.P, "x", TopFlange2), isUpper: false
        };
      }
    } else { // 개구
      for (let i = 0; i < 2; i++) {
        let lx = Math.sqrt((iSectionPoint.web[i][1].x - uPoint.x) ** 2 + (iSectionPoint.web[i][1].y - uPoint.y) ** 2);
        let sign = i === 0 ? -1 : 1;
        let TopFlange = [{ x: sign * (lx + iSectionPoint.input.buf), y: -xs.uflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.buf), y: xs.uflangeJointLength / 2 },
        { x: sign * (lx + iSectionPoint.input.buf - iSectionPoint.input.wuf), y: xs.uflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.buf - iSectionPoint.input.wuf), y: - xs.uflangeJointLength / 2 }];

        let keyName = i === 0 ? "lTop" : "rTop";
        let side2D = i === 0 ? [0, 1] : null;
        result[keyName] = hPlateGen(TopFlange, centerPoint, xs.uflangeJointThickness, sp.uflangeThickness, 90, Math.atan(iPoint.gradientX), -Math.atan(gradient), null, true, side2D);
        let TopFlange2 = [{ x: sign * (lx + iSectionPoint.input.buf), y: -xs.uflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.buf), y: xs.uflangeJointLength / 2 },
        { x: sign * (lx + sp.webThickness + xs.margin2), y: xs.uflangeJointLength / 2 }, { x: sign * (lx + sp.webThickness + xs.margin2), y: - xs.uflangeJointLength / 2 }];
        let TopFlange3 = [{ x: sign * (lx - xs.margin2), y: -xs.uflangeJointLength / 2 }, { x: sign * (lx - xs.margin2), y: xs.uflangeJointLength / 2 },
        { x: sign * (lx + iSectionPoint.input.buf - iSectionPoint.input.wuf), y: xs.uflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.buf - iSectionPoint.input.wuf), y: - xs.uflangeJointLength / 2 }];

        result[keyName + "2"] = hPlateGen(TopFlange2, centerPoint, xs.uflangeJointThickness, - xs.uflangeJointThickness, 90, Math.atan(iPoint.gradientX), -Math.atan(gradient), null, false, side2D);
        result[keyName + "2"].bolt = {
          P: fBolt.P, G: fBolt.G, size: fBolt.size, dia: fBolt.dia, t: fBolt.t, l: 2 * xs.uflangeJointThickness + sp.uflangeThickness,
          layout: BoltLayout(fBolt.G, fBolt.P, "x", TopFlange2), isUpper: false
        };
        result[keyName + "3"] = hPlateGen(TopFlange3, centerPoint, xs.uflangeJointThickness, - xs.uflangeJointThickness, 90, Math.atan(iPoint.gradientX), -Math.atan(gradient), null, false, null);
        result[keyName + "3"].bolt = {
          P: fBolt.P, G: fBolt.G, size: fBolt.size, dia: fBolt.dia, t: fBolt.t, l: 2 * xs.uflangeJointThickness + sp.uflangeThickness,
          layout: BoltLayout(fBolt.G, fBolt.P, "x", TopFlange3), isUpper: false
        };
      }
    }

    let lPoint = { x: 0, y: iSectionPoint.web[0][0].y };
    centerPoint = ToGlobalPoint(iPoint, lPoint);
    // let BottomFlangeBolt = {
    //   P: fBolt.P, G: fBolt.G, pNum: fBolt.pNum, gNum: fBolt.gNum, size: fBolt.size, t: fBolt.t, l: 2 * xs.lflangeJointThickness + sp.lflangeThickness,
    //   spliceAxis: "x", isUpper: true
    // }
    let bXRad = Math.atan(iPoint.gradientX + iSectionPoint.input.gradientlf);
    // console.log("check", bXRad)

    if (iSectionPoint.lflange[2].length > 0) { //폐합
      let lx1 = Math.sqrt((iSectionPoint.web[0][0].x - lPoint.x) ** 2 + (iSectionPoint.web[0][0].y - lPoint.y) ** 2);
      let lx2 = Math.sqrt((iSectionPoint.web[1][0].x - lPoint.x) ** 2 + (iSectionPoint.web[1][0].y - lPoint.y) ** 2);
      let sec = (lx1 + lx2) / (iSectionPoint.web[1][1].x - iSectionPoint.web[0][1].x);
      let BottomFlange = [{ x: (-lx1 - iSectionPoint.input.blf), y: -xs.lflangeJointLength / 2 },
      { x: (-lx1 - iSectionPoint.input.blf), y: xs.lflangeJointLength / 2 },
      { x: (lx2 + iSectionPoint.input.blf), y: xs.uflangeJointLength / 2 },
      { x: (lx2 + iSectionPoint.input.blf), y: -xs.uflangeJointLength / 2 },];
      let side2D = [0, 1];
      let keyName = "cBottom";
      result[keyName] = hPlateGen(BottomFlange, centerPoint, xs.lflangeJointThickness, - sp.lflangeThickness - xs.lflangeJointThickness, 90,
        bXRad, 0, null, false, side2D);
      let xList = [-lx1 - iSectionPoint.input.blf, -lx1 - sp.webThickness - xs.margin2,
      -lx1 + xs.margin2];
      for (let i in iSectionPoint.input.Lrib.layout) {
        xList.push((iSectionPoint.input.Lrib.layout[i] - iSectionPoint.input.Lrib.thickness / 2) * sec - xs.margin2);
        xList.push((iSectionPoint.input.Lrib.layout[i] + iSectionPoint.input.Lrib.thickness / 2) * sec + xs.margin2);
      }    xList.push(lx2 - xs.margin2, lx2 + sp.webThickness + xs.margin2, lx2 + iSectionPoint.input.blf);
      for (let i = 0; i < xList.length; i += 2) {
        keyName = "cBottom" + i;
        let BottomFlange2 = [{ x: xList[i], y: -xs.uflangeJointLength / 2 }, { x: xList[i], y: xs.uflangeJointLength / 2 },
        { x: xList[i + 1], y: xs.uflangeJointLength / 2 }, { x: xList[i + 1], y: -xs.uflangeJointLength / 2 }];
        side2D = i === 0 ? [0, 1] : null;
        result[keyName] = hPlateGen(BottomFlange2, centerPoint, xs.uflangeJointThickness, 0, 90, bXRad, 0, null, false, side2D);
        result[keyName].bolt = {
          P: fBolt.P, G: fBolt.G, size: fBolt.size, dia: fBolt.dia, t: fBolt.t, l: 2 * xs.lflangeJointThickness + sp.lflangeThickness,
          layout: BoltLayout(fBolt.G, fBolt.P, "x", BottomFlange2), isUpper: true
        };
      }
    } else { // 개구
      for (let i = 0; i < 2; i++) {
        let lx = Math.sqrt((iSectionPoint.web[i][0].x - lPoint.x) ** 2 + (iSectionPoint.web[i][0].y - lPoint.y) ** 2);
        let sign = i === 0 ? -1 : 1;
        let BottomFlange = [{ x: sign * (lx + iSectionPoint.input.blf), y: -xs.lflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.blf), y: xs.lflangeJointLength / 2 },
        { x: sign * (lx + iSectionPoint.input.blf - iSectionPoint.input.wlf), y: xs.lflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.blf - iSectionPoint.input.wlf), y: - xs.lflangeJointLength / 2 }];
        let keyName = i === 0 ? "lBottom" : "rBottom";
        let side2D = i === 0 ? [0, 1] : null;
        result[keyName] = hPlateGen(BottomFlange, centerPoint, xs.lflangeJointThickness, - sp.lflangeThickness - xs.lflangeJointThickness, 90, bXRad, 0, null, false, side2D);
        let BottomFlange2 = [{ x: sign * (lx + iSectionPoint.input.blf), y: -xs.lflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.blf), y: xs.lflangeJointLength / 2 },
        { x: sign * (lx + sp.webThickness + xs.margin2), y: xs.lflangeJointLength / 2 }, { x: sign * (lx + sp.webThickness + xs.margin2), y: - xs.lflangeJointLength / 2 }];
        let BottomFlange3 = [{ x: sign * (lx - xs.margin2), y: -xs.lflangeJointLength / 2 }, { x: sign * (lx - xs.margin2), y: xs.lflangeJointLength / 2 },
        { x: sign * (lx + iSectionPoint.input.blf - iSectionPoint.input.wlf), y: xs.lflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.blf - iSectionPoint.input.wlf), y: - xs.lflangeJointLength / 2 }];
        result[keyName + "2"] = hPlateGen(BottomFlange2, centerPoint, xs.lflangeJointThickness, 0, 90, bXRad, 0, null, false, side2D);
        result[keyName + "2"].bolt = {
          P: fBolt.P, G: fBolt.G, size: fBolt.size,  dia: fBolt.dia, t: fBolt.t, l: 2 * xs.lflangeJointThickness + sp.lflangeThickness,
          layout: BoltLayout(fBolt.G, fBolt.P, "x", BottomFlange2), isUpper: true
        };
        result[keyName + "3"] = hPlateGen(BottomFlange3, centerPoint, xs.lflangeJointThickness, 0, 90, bXRad, 0, null, false, null);
        result[keyName + "3"].bolt = {
          P: fBolt.P, G: fBolt.G, size: fBolt.size,  dia: fBolt.dia, t: fBolt.t, l: 2 * xs.lflangeJointThickness + sp.lflangeThickness,
          layout: BoltLayout(fBolt.G, fBolt.P, "x", BottomFlange3), isUpper: true
        };
      }
    }
    return result
  }
  function BoltLayout(x, y, axis, platePoints) {
    let result = [];
    // 볼트배치 자동계산 모듈 // 2020.7.7 by drlim
    let cp = {
      x: (platePoints[0].x + platePoints[2].x) / 2,
      y: (platePoints[0].y + platePoints[2].y) / 2
    };
    let lx = Math.abs(platePoints[2].x - platePoints[0].x);
    let ly = Math.abs(platePoints[2].y - platePoints[0].y);
    let dx, dy, xNum, yNum, yEnd, xEnd;

    if (axis === "x") {
      ly = ly / 2;
    } else {
      lx = lx / 2;
    }
    yNum = Math.floor(ly / y);
    xNum = Math.floor(lx / x);
    if (xNum < 1) {
      xNum += 1;
      xEnd = (lx % x) / 2;
    } else {
      xEnd = (x + lx % x) / 2;
    }
    if (yNum < 1) {
      yNum += 1;
      yEnd = (ly % y) / 2;
    } else {
      yEnd = (y + ly % y) / 2;
    }
    for (let i = 0; i < xNum; i++) {
      for (let j = 0; j < yNum; j++) {
        for (let l = 0; l < 2; l++) {
          if (axis === "x") {
            dx = 0;
            dy = l == 0 ? ly / 2 : - ly / 2;
          } else {
            dx = l === 0 ? lx / 2 : - lx / 2;
            dy = 0;
          }
          let xtranslate = cp.x + dx + lx / 2 - xEnd - i * x; // pitch와 gage개념 다시 확인(분절면을 기준으로)
          let ytranslate = cp.y + dy + ly / 2 - yEnd - j * y;
          result.push([xtranslate, ytranslate]);
        }
      }
    }
    return result
  }

  function IbeamJoint(webPoints, centerPoint, xs, wBolt, fBolt) {
    // webPoint는 반드시 좌측하단을 시작으로 시계반대방향순이어야함
    // let xs = {
    //   webThickness: 12,
    //   flangeWidth: 250,
    //   flangeThickness: 12,
    //   webJointThickness: 10,
    //   webJointWidth: 330,
    //   webJointHeight: 440,
    //   flangeJointThickness: 10,
    //   flangeJointLength: 480,
    //   flangeJointWidth: 80,
    // }
    // 볼트 배치에 대한 인풋고려필요

    // let wBolt = {
    //   P:90,
    //   G:75,
    //   pNum:5,
    //   gNum:2,
    //   size:37,
    //   t:14,
    // }
    // let fBolt = {
    //   P:170,
    //   G:75,
    //   pNum:2,
    //   gNum:3,
    //   size:37,
    //   t:14,
    // }


    let result = {};
    const rotationY = (centerPoint.skew - 90) * Math.PI / 180;
    let uGradient = (webPoints[3].y - webPoints[2].y) / (webPoints[3].x - webPoints[2].x);
    let lGradient = (webPoints[1].y - webPoints[0].y) / (webPoints[1].x - webPoints[0].x);
    let uRad = -Math.atan(uGradient);
    let lRad = -Math.atan(lGradient);

    /////////////////////////////////// to the Joint function //////////////////////////////////////////
    let origin1 = { x: (webPoints[0].x + webPoints[3].x) / 2, y: (webPoints[0].y + webPoints[3].y) / 2 };
    let origin2 = { x: (webPoints[1].x + webPoints[2].x) / 2, y: (webPoints[1].y + webPoints[2].y) / 2 };
    let webPoint1 = ToGlobalPoint(centerPoint, origin1);
    let webPoint2 = ToGlobalPoint(centerPoint, origin2);
    let webJoint1 = [{ x: - xs.webJointWidth / 2, y: - xs.webJointHeight / 2 },
    { x: xs.webJointWidth / 2, y: - xs.webJointHeight / 2 },
    { x: xs.webJointWidth / 2, y: xs.webJointHeight / 2 },
    { x: - xs.webJointWidth / 2, y: xs.webJointHeight / 2 }];
    let webJoint2D1 = TranslatePoints(origin1, webJoint1);
    let WebBolt = {
      P: wBolt.P, G: wBolt.G, size: wBolt.size, dia: wBolt.dia, t: wBolt.t, l: xs.webJointThickness * 2 + xs.webThickness,
      layout: BoltLayout(wBolt.G, wBolt.P, "Y", webJoint1), isUpper: true
    };
    result["webJoint1"] = hPlateGen(webJoint1, webPoint1, xs.webJointThickness, xs.webThickness / 2, centerPoint.skew, Math.PI / 2, rotationY, webJoint2D1);
    result["webJoint1"]["bolt"] = WebBolt;
    result["webJoint2"] = hPlateGen(webJoint1, webPoint1, xs.webJointThickness, - xs.webJointThickness - xs.webThickness / 2, centerPoint.skew, Math.PI / 2, rotationY);
    let webJoint2D3 = TranslatePoints(origin2, webJoint1);
    result["webJoint3"] = hPlateGen(webJoint1, webPoint2, xs.webJointThickness, xs.webThickness / 2, centerPoint.skew, Math.PI / 2, rotationY, webJoint2D3);
    result["webJoint3"]["bolt"] = WebBolt;
    result["webJoint4"] = hPlateGen(webJoint1, webPoint2, xs.webJointThickness, - xs.webJointThickness - xs.webThickness / 2, centerPoint.skew, Math.PI / 2, rotationY);

    // flange Joint
    let joint2D = [{ x: - xs.flangeJointLength / 2, y: 0 }, { x: xs.flangeJointLength / 2, y: 0 },
    { x: xs.flangeJointLength / 2, y: xs.flangeJointThickness }, { x: - xs.flangeJointLength / 2, y: xs.flangeJointThickness }];
    let joint1 = [{ x: - xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 },
    { x: xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 },
    { x: xs.flangeJointLength / 2, y: xs.flangeWidth / 2 },
    { x: - xs.flangeJointLength / 2, y: xs.flangeWidth / 2 }];
    let joint2 = [{ x: - xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 },
    { x: xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 },
    { x: xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 + xs.flangeJointWidth },
    { x: - xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 + xs.flangeJointWidth }];
    let joint3 = [{ x: - xs.flangeJointLength / 2, y: xs.flangeWidth / 2 },
    { x: xs.flangeJointLength / 2, y: xs.flangeWidth / 2 },
    { x: xs.flangeJointLength / 2, y: xs.flangeWidth / 2 - xs.flangeJointWidth },
    { x: - xs.flangeJointLength / 2, y: xs.flangeWidth / 2 - xs.flangeJointWidth }];

    let uflangeBolt = {
      P: fBolt.P, G: fBolt.G, size: fBolt.size, dia: fBolt.dia, t: fBolt.t, l: xs.flangeJointThickness * 2 + xs.flangeThickness,
      layout: BoltLayout(fBolt.G, fBolt.P, "y", joint2), isUpper: false
    };
    let uflangeBolt2 = {
      P: fBolt.P, G: fBolt.G, size: fBolt.size, dia: fBolt.dia, t: fBolt.t, l: xs.flangeJointThickness * 2 + xs.flangeThickness,
      layout: BoltLayout(fBolt.G, fBolt.P, "y", joint3), isUpper: false
    };
    let lflangeBolt = {
      P: fBolt.P, G: fBolt.G, size: fBolt.size, dia: fBolt.dia, t: fBolt.t, l: xs.flangeJointThickness * 2 + xs.flangeThickness,
      layout: BoltLayout(fBolt.G, fBolt.P, "y", joint2), isUpper: true
    };
    let lflangeBolt2 = {
      P: fBolt.P, G: fBolt.G, size: fBolt.size, dia: fBolt.dia, t: fBolt.t, l: xs.flangeJointThickness * 2 + xs.flangeThickness,
      layout: BoltLayout(fBolt.G, fBolt.P, "y", joint3), isUpper: true
    };

    let uPoint1 = ToGlobalPoint(centerPoint, webPoints[3]);
    let uPoint2 = ToGlobalPoint(centerPoint, webPoints[2]);

    result["upperJoint1"] = hPlateGen(joint1, uPoint1, xs.flangeJointThickness, xs.flangeThickness, centerPoint.skew, 0, uRad,
      TranslatePoints(webPoints[3], joint2D, xs.flangeThickness, -uRad), true);
    result["upperJoint2"] = hPlateGen(joint2, uPoint1, xs.flangeJointThickness, - xs.flangeJointThickness, centerPoint.skew, 0, uRad,
      TranslatePoints(webPoints[3], joint2D, - xs.flangeJointThickness, -uRad));
    result["upperJoint2"].bolt = uflangeBolt;
    result["upperJoint3"] = hPlateGen(joint3, uPoint1, xs.flangeJointThickness, - xs.flangeJointThickness, centerPoint.skew, 0, uRad);
    result["upperJoint3"].bolt = uflangeBolt2;
    result["upperJoint11"] = hPlateGen(joint1, uPoint2, xs.flangeJointThickness, xs.flangeThickness, centerPoint.skew, 0, uRad,
      TranslatePoints(webPoints[2], joint2D, xs.flangeThickness, -uRad), true);
    result["upperJoint22"] = hPlateGen(joint2, uPoint2, xs.flangeJointThickness, - xs.flangeJointThickness, centerPoint.skew, 0, uRad,
      TranslatePoints(webPoints[2], joint2D, - xs.flangeJointThickness, -uRad));
    result["upperJoint22"].bolt = uflangeBolt;
    result["upperJoint33"] = hPlateGen(joint3, uPoint2, xs.flangeJointThickness, - xs.flangeJointThickness, centerPoint.skew, 0, uRad);
    result["upperJoint33"].bolt = uflangeBolt2;

    let lPoint1 = ToGlobalPoint(centerPoint, webPoints[0]);
    let lPoint2 = ToGlobalPoint(centerPoint, webPoints[1]);

    result["lowerJoint1"] = hPlateGen(joint1, lPoint1, xs.flangeJointThickness, - xs.flangeThickness - xs.flangeJointThickness, centerPoint.skew, 0, lRad,
      TranslatePoints(webPoints[0], joint2D, - xs.flangeThickness - xs.flangeJointThickness, -lRad));
    result["lowerJoint2"] = hPlateGen(joint2, lPoint1, xs.flangeJointThickness, 0, centerPoint.skew, 0, lRad);
    result["lowerJoint2"].bolt = lflangeBolt;
    result["lowerJoint3"] = hPlateGen(joint3, lPoint1, xs.flangeJointThickness, 0, centerPoint.skew, 0, lRad,
      TranslatePoints(webPoints[0], joint2D, 0, -lRad));
    result["lowerJoint3"].bolt = lflangeBolt2;
    result["lowerJoint11"] = hPlateGen(joint1, lPoint2, xs.flangeJointThickness, -xs.flangeThickness - xs.flangeJointThickness, centerPoint.skew, 0, lRad,
      TranslatePoints(webPoints[1], joint2D, - xs.flangeThickness - xs.flangeJointThickness, -lRad));
    result["lowerJoint22"] = hPlateGen(joint2, lPoint2, xs.flangeJointThickness, 0, centerPoint.skew, 0, lRad);
    result["lowerJoint22"].bolt = lflangeBolt;
    result["lowerJoint33"] = hPlateGen(joint3, lPoint2, xs.flangeJointThickness, 0, centerPoint.skew, 0, lRad,
      TranslatePoints(webPoints[1], joint2D, 0, -lRad));
    result["lowerJoint33"].bolt = lflangeBolt2;
    /////////////////////////////////// to the function //////////////////////////////////////////
    return result
  }

  function TranslatePoints(origin, points, yoffset, radian) {
    let result = [];
    let yoff = yoffset ? yoffset : 0;
    if (radian) {
      let cos = Math.cos(radian);
      let sin = Math.sin(radian);
      points.forEach(pt => result.push({ x: origin.x + cos * pt.x - sin * (pt.y + yoff), y: origin.y + sin * pt.x + cos * (pt.y + yoff) }));
    } else {
      points.forEach(pt => result.push({ x: origin.x + pt.x, y: origin.y + (pt.y + yoff) }));
    }

    return result
  }

  function DiaShapeDict(
    gridPoint,
    sectionPointDict,
    diaphragmLayout,
    diaphragmSectionList,
    sectionDB
  ) {
    const position = 0;
    const section = 1;
    let result = {};
    for (let i = 0; i < diaphragmLayout.length; i++) {
      let gridkey = diaphragmLayout[i][position];
      let diaSection = diaphragmSectionList[diaphragmLayout[i][section]];
      let webPoints = [
        sectionPointDict[gridkey].forward.lWeb[0],
        sectionPointDict[gridkey].forward.lWeb[1],
        sectionPointDict[gridkey].forward.rWeb[0],
        sectionPointDict[gridkey].forward.rWeb[1]
      ];
      let uflangePoints = [
        sectionPointDict[gridkey].forward.leftTopPlate[1],
        sectionPointDict[gridkey].forward.leftTopPlate[2],
        sectionPointDict[gridkey].forward.rightTopPlate[1],
        sectionPointDict[gridkey].forward.rightTopPlate[2]
      ];
      let lflange = sectionPointDict[gridkey].forward.lflange;
      let uflange = sectionPointDict[gridkey].forward.uflange;
      let skew = sectionPointDict[gridkey].forward.skew;
      let urib = sectionPointDict[gridkey].forward.input.Urib;
      let lrib = sectionPointDict[gridkey].forward.input.Lrib;
      if (diaphragmLayout[i][section] == "diaType1") {
        result[gridkey] = uBoxDia1(webPoints, gridPoint[gridkey], skew, uflangePoints, uflange, lrib, diaSection, sectionDB);
      } else if (diaphragmLayout[i][section] == "diaType2") {
        result[gridkey] = boxDiaHole1(webPoints, gridPoint[gridkey], skew, uflange, urib, lrib, diaSection);
      } else if (diaphragmLayout[i][section] == "DYdia0") {
        result[gridkey] = DYdia0(
          webPoints,
          gridPoint[gridkey],
          skew,
          lflange);
      } else if (diaphragmLayout[i][section] == "DYdia1") {
        result[gridkey] = DYdia1(
          webPoints,
          gridPoint[gridkey]);
      } else if (diaphragmLayout[i][section] == "DYdia2") {
        result[gridkey] = DYdia2(
          webPoints,
          gridPoint[gridkey]);
      } else if (diaphragmLayout[i][section] == "DYdia3") {
        result[gridkey] = DYdia3(
          webPoints,
          gridPoint[gridkey],
          skew,
          uflange);
      } else if (diaphragmLayout[i][section] == "DYdia4") {
        result[gridkey] = DYdia4(
          webPoints,
          gridPoint[gridkey],
          skew,
          urib);
      } else if (diaphragmLayout[i][section] == "DYdia5") {
        result[gridkey] = DYdia5(
          webPoints,
          gridPoint[gridkey],
          urib,
          lrib);
      } else if (diaphragmLayout[i][section] == "DYdia6") {
        result[gridkey] = DYdia6(
          webPoints,
          gridPoint[gridkey],
          urib,
          lrib);
      }

      result[gridkey].point = gridPoint[gridkey];
    }

    return result;
  }

  function VstiffShapeDict(
    gridPoint,
    sectionPointDict,
    vStiffLayout,
    vStiffSectionList,
    sectionDB
  ) {
    const position = 0;
    const section = 1;
    let result = {};
    for (let i = 0; i < vStiffLayout.length; i++) {
      let gridkey = vStiffLayout[i][position];
      let vSection = vStiffSectionList[vStiffLayout[i][section]];
      let webPoints = [
        sectionPointDict[gridkey].forward.web[0][0],
        sectionPointDict[gridkey].forward.web[0][1],
        sectionPointDict[gridkey].forward.web[1][0],
        sectionPointDict[gridkey].forward.web[1][1]
      ];
      let uflangePoints = [
        sectionPointDict[gridkey].forward.leftTopPlate[1],
        sectionPointDict[gridkey].forward.leftTopPlate[2],
        sectionPointDict[gridkey].forward.rightTopPlate[1],
        sectionPointDict[gridkey].forward.rightTopPlate[2]
      ];
      let skew = sectionPointDict[gridkey].forward.skew;
      if (vStiffLayout[i][section] === "HMvStiff1") {
        result[gridkey] = HMvStiff1(webPoints, gridPoint[gridkey], skew, uflangePoints, vSection, sectionDB);
      }
      else if (vStiffLayout[i][section] === "DYvStiff1") {
        result[gridkey] = DYVstiff1(webPoints, gridPoint[gridkey]);
      } else if (vStiffLayout[i][section] === "DYvStiff0") {
        result[gridkey] = DYVstiff0(webPoints, gridPoint[gridkey]);
      }
      result[gridkey].point = gridPoint[gridkey]; // 추후 삭제필요
    }

    return result;
  }

  function HBracingDict(
    pointDict,
    sectionPointDict,
    hBracingLayout,
    hBracingectionList,
    sectionDB
  ) {
    let result = {};
    const from = 0;
    const to = 1;
    const leftToright = 2;
    const section = 3;
    // const platelayout = 4;
    // let hBracingDict = {};
    // let hBracingPlateDict = {};
    let right = true;


    for (let i = 0; i < hBracingLayout.length; i++) {
      if (hBracingLayout[i][section] === "hBracingType1") {
        let hBSection = hBracingectionList[hBracingLayout[i][section]];
        let pk1 = hBracingLayout[i][from];
        let pk2 = hBracingLayout[i][to];
        let webPoints1 = [
          sectionPointDict[pk1].forward.web[0][0],
          sectionPointDict[pk1].forward.web[0][1],
          sectionPointDict[pk1].forward.web[1][0],
          sectionPointDict[pk1].forward.web[1][1]
        ];
        let webPoints2 = [
          sectionPointDict[pk2].forward.web[0][0],
          sectionPointDict[pk2].forward.web[0][1],
          sectionPointDict[pk2].forward.web[1][0],
          sectionPointDict[pk2].forward.web[1][1]
        ];
        let webPoints = [];
        if (hBracingLayout[i][leftToright]) {
          webPoints = [webPoints1[0],webPoints1[1],webPoints2[2],webPoints2[3]];
        } else {
          webPoints = [webPoints1[2],webPoints1[3],webPoints2[0],webPoints2[1]];
        }
        let point1 = pointDict[pk1];
        let point2 = pointDict[pk2];

        result[pk1 + pk2] = hBracingFrame(point1, point2, webPoints, hBSection, sectionDB);
        if (hBracingLayout[i][4]) {
          right = hBracingLayout[i][leftToright] ? false : true;
          result[pk1 + pk2]["p1"] = hBracingPlate(point1, right, webPoints1, hBSection);
        }
        if (hBracingLayout[i][5]) {
          right = hBracingLayout[i][leftToright] ? true : false;
          result[pk1 + pk2]["p2"] = hBracingPlate(point2, right, webPoints2, hBSection);
        }
        
      }
    }

    return result;
  }

  function JackupStiffDict(gridPoint,
    sectionPointDict,
    jackupData, // position, layoutList, length, height, thickness, chamfer
  ) {
    let result = {};
    for (let i in jackupData) {
      let gridkey = jackupData[i][0];
      let webPoints = sectionPointDict[gridkey].forward.web;
      result[gridkey + i] = jackup0(webPoints, gridPoint[gridkey], jackupData[i]);
    }
    return result
  }

  function HorStiffDict(
    pointDict,
    sectionPointDict,
    hstiffLayout,
  ) {
    let result = {};
    const from = 0;
    const to = 1;
    // const starOffset = 2;
    // const endOffset = 3;
    // const width = 4;
    // const thickness = 5;
    // const chamfer = 6;
    // const isTop =7;
    // const offset =8;

    for (let i = 0; i < hstiffLayout.length; i++) {
        let pk1 = hstiffLayout[i][from];
        let pk2 = hstiffLayout[i][to];
        let point1 = pointDict[pk1];
        let point2 = pointDict[pk2];
        let webPoints1 = [
          sectionPointDict[pk1].forward.web[0][0],
          sectionPointDict[pk1].forward.web[0][1],
          sectionPointDict[pk1].forward.web[1][0],
          sectionPointDict[pk1].forward.web[1][1]
        ];
        let webPoints2 = [
          sectionPointDict[pk2].backward.web[0][0],
          sectionPointDict[pk2].backward.web[0][1],
          sectionPointDict[pk2].backward.web[1][0],
          sectionPointDict[pk2].backward.web[1][1]
        ];
        result[pk1 + pk2] = HstiffGen(point1, point2, webPoints1, webPoints2, hstiffLayout[i]);
    }
    return result;
  }


  function HstiffGen(point1, point2, webPoints1, webPoints2, hstiffLayout){
    const startOffset = hstiffLayout[2]*1;
    const endOffset = hstiffLayout[3]*1;
    const width = hstiffLayout[4]*1;
    const thickness = hstiffLayout[5]*1;
    const chamfer = hstiffLayout[6]*1;
    const isTop =hstiffLayout[7];
    const offset =hstiffLayout[8]*1;
    let result = {};

    const bl1 = webPoints1[0];
    const tl1 = webPoints1[1];
    const br1 = webPoints1[2];
    const tr1 = webPoints1[3];
    const bl2 = webPoints2[0];
    const tl2 = webPoints2[1];
    const br2 = webPoints2[2];
    const tr2 = webPoints2[3];

    const lcot1 = (tl1.x - bl1.x) / (tl1.y - bl1.y);
    const rcot1 = (tr1.x - br1.x) / (tr1.y - br1.y);
    const lcot2 = (tl2.x - bl2.x) / (tl2.y - bl2.y);
    const rcot2 = (tr2.x - br2.x) / (tr2.y - br2.y);

    let lnode1 = isTop? {x:tl1.x - lcot1 * offset, y: tl1.y - offset } : {x:bl1.x + lcot1 * offset, y: bl1.y + offset };
    let lnode2 = isTop? {x:tl2.x - lcot2 * offset, y: tl2.y - offset } : {x:bl2.x + lcot2 * offset, y: bl2.y + offset };
    let lgn1 = ToGlobalPoint(point1, lnode1); //leftGlobalNode
    let lgn2 = ToGlobalPoint(point2, lnode2);
    let rnode1 = isTop? {x:tr1.x - rcot1 * offset, y: tr1.y - offset } : {x:br1.x + rcot1 * offset, y: br1.y + offset };
    let rnode2 = isTop? {x:tr2.x - rcot2 * offset, y: tr2.y - offset } : {x:br2.x + rcot2 * offset, y: br2.y + offset };
    let rgn1 = ToGlobalPoint(point1, rnode1); //rightGlobalNode
    let rgn2 = ToGlobalPoint(point2, rnode2);
    let lvec = [lgn2.x - lgn1.x, lgn2.y - lgn1.y,lgn2.z - lgn1.z];
    let lLength = Math.sqrt(lvec[0]**2 + lvec[1]**2 + lvec[2]**2);
    let lLength2D = Math.sqrt(lvec[0]**2 + lvec[1]**2);
    let rvec = [rgn2.x - rgn1.x, rgn2.y - rgn1.y,rgn2.z - rgn1.z];
    let rLength = Math.sqrt(rvec[0]**2 + rvec[1]**2 + rvec[2]**2);
    let rLength2D = Math.sqrt(rvec[0]**2 + rvec[1]**2);
    let lCenterPoint = {
      x: (lgn1.x + lgn2.x)/2,
      y: (lgn1.y + lgn2.y)/2,
      z: (lgn1.z + lgn2.z)/2,
      normalCos : lvec[1] / lLength2D,
      normalSin : -lvec[0] / lLength2D,
      offset : point1.offset + (lnode1.x + lnode2.x)/2
    };
    let rCenterPoint = {
      x: (rgn1.x + rgn2.x)/2,
      y: (rgn1.y + rgn2.y)/2,
      z: (rgn1.z + rgn2.z)/2,
      normalCos : rvec[1] / rLength2D,
      normalSin : -rvec[0] / rLength2D,
      offset : point1.offset + (rnode1.x + rnode2.x)/2
    };
    let lRotX = Math.atan(lvec[2]/lLength2D);
    let rRotX = Math.atan(rvec[2]/rLength2D);
    let lRotY = Math.atan(lcot1);
    let rRotY = Math.atan(rcot1);

    let lPlate = [{x:0,y: - lLength/2 + startOffset}, {x:0,y: lLength/2 - endOffset}, 
      {x:width - chamfer,y: lLength/2 - endOffset},{x:width,y: lLength/2 - endOffset- chamfer},
      {x:width,y: -lLength/2 + startOffset + chamfer}, {x:width - chamfer, y: -lLength/2 + startOffset}
    ];
    let rPlate = [{x:0,y: - rLength/2 + startOffset}, {x:0,y: rLength/2 - endOffset}, 
      {x:-(width - chamfer),y: rLength/2 - endOffset},{x:-width,y: rLength/2 - endOffset- chamfer},
      {x:-width,y: -rLength/2 + startOffset + chamfer}, {x:-(width - chamfer), y: -rLength/2 + startOffset}
    ];

    result["left"] = hPlateGen(lPlate,lCenterPoint,thickness,0,90,lRotX,lRotY,null,false,null);
    result["right"] = hPlateGen(rPlate,rCenterPoint,thickness,0,90,rRotX,rRotY,null,false,null);
    return result
  }



  function jackup0(webPoints, point, jackupData) {
    //ds 입력변수
    let result = {};
    let layout = jackupData[1];
    let length = jackupData[2];
    let height = jackupData[3];
    let thickness = jackupData[4];
    let chamfer = jackupData[5];
    //  임시 입력변수

    const bl = webPoints[0][0];
    const bl2 = webPoints[0][3];
    const tl = webPoints[0][1];
    const br = webPoints[1][0];
    const br2 = webPoints[1][3];

    const tr = webPoints[1][1];
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);
    const gradient = (tr.y - tl.y) / (tr.x - tl.x);

    let upperPoints = [
      { x: bl.x + lwCot * length, y: bl.y + length },
      { x: br.x + rwCot * length, y: br.y + length },
      { x: bl2.x + lwCot * length, y: bl2.y + length },
      { x: br2.x + rwCot * length, y: br2.y + length }

    ];

    let left = PlateRestPoint(bl, upperPoints[0], 0, 0, height);
    let leftPoints = [];
    leftPoints.push(left[0]);
    leftPoints.push(left[1]);
    leftPoints.push(...scallop(left[1], left[2], left[3], chamfer, 1));
    leftPoints.push(left[3]);
    let right = PlateRestPoint(br, upperPoints[1], 0, 0, -height);
    let rightPoints = [];
    rightPoints.push(right[0]);
    rightPoints.push(right[1]);
    rightPoints.push(...scallop(right[1], right[2], right[3], chamfer, 1));
    rightPoints.push(right[3]);
    let left1 = PlateRestPoint(bl2, upperPoints[2], 0, 0, -height);
    let leftPoints2 = [];
    leftPoints2.push(left1[0]);
    leftPoints2.push(left1[1]);
    leftPoints2.push(...scallop(left1[1], left1[2], left1[3], chamfer, 1));
    leftPoints2.push(left1[3]);
    let right1 = PlateRestPoint(br2, upperPoints[3], 0, 0, height);
    let rightPoints2 = [];
    rightPoints2.push(right1[0]);
    rightPoints2.push(right1[1]);
    rightPoints2.push(...scallop(right1[1], right1[2], right1[3], chamfer, 1));
    rightPoints2.push(right1[3]);

    for (let i in layout) {
      let newPoint = ToGlobalPoint2(point, { x: 0, y: layout[i] });
      result["left1" + i] = vPlateGen(leftPoints, newPoint, thickness, [], 15, null, null, [], [3, 0], [1, 2, 4, 0]);
      result["left2" + i] = vPlateGen(leftPoints2, newPoint, thickness, [], 15, null, null, [], [3, 0], null);
      result["right1" + i] = vPlateGen(rightPoints, newPoint, thickness, [], 15, null, null, [], [3, 0], null);
      result["right2" + i] = vPlateGen(rightPoints2, newPoint, thickness, [], 15, null, null, [], [3, 0], null);
    }
    return result
  }

  function DYVstiff0(webPoints, point, skew, uflangePoint, ds) {
    //ds 입력변수
    let result = {};
    let dsi = {
      stiffWidth: 150,
      stiffThickness: 12,
      scallopRadius: 35,
      chamfer: 130,
    }; //  임시 입력변수

    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const gradient = (tr.y - tl.y) / (tr.x - tl.x);

    let lowerPoints = [
      { x: bl.x, y: bl.y },
      { x: br.x, y: br.y }
    ];

    let left = PlateRestPoint(lowerPoints[0], tl, 0, gradient, dsi.stiffWidth);

    result["left"] = vPlateGen(left, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], [1, 2], [1, 2, 3, 0]);

    let right = PlateRestPoint(lowerPoints[1], tr, 0, gradient, -dsi.stiffWidth);

    result["right"] = vPlateGen(right, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], [1, 2], null);

    return result
  }


  function DYVstiff1(webPoints, point, skew, uflangePoint, ds) {
    //ds 입력변수
    let result = {};
    let dsi = {
      lowerSpacing: 50,
      stiffWidth: 150,
      stiffThickness: 12,
      scallopRadius: 35,
      chamfer: 130,
    }; //  임시 입력변수
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);
    const gradient = (tr.y - tl.y) / (tr.x - tl.x);

    let lowerPoints = [
      { x: bl.x + lwCot * dsi.lowerSpacing, y: bl.y + dsi.lowerSpacing },
      { x: br.x + rwCot * dsi.lowerSpacing, y: br.y + dsi.lowerSpacing }
    ];

    let left = PlateRestPoint(lowerPoints[0], tl, 0, gradient, dsi.stiffWidth);
    let leftPoints = [];
    leftPoints.push(left[0]);
    leftPoints.push(left[1]);
    leftPoints.push(left[2]);
    leftPoints.push(...scallop(left[2], left[3], left[0], dsi.chamfer, 1));

    result["left"] = vPlateGen(leftPoints, point, dsi.stiffThickness, [1], dsi.scallopRadius, null, null, [], [1, 2], [1, 2, 4, 0]);
    // {
    //   points: leftPoints,
    //   Thickness: dsi.stiffThickness,
    //   z: -dsi.stiffThickness / 2,
    //   rotationX: Math.PI / 2,
    //   rotationY: rotationY,
    //   hole: [],
    //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    // }
    let right = PlateRestPoint(lowerPoints[1], tr, 0, gradient, -dsi.stiffWidth);
    let rightPoints = [];
    rightPoints.push(right[0]);
    rightPoints.push(right[1]);
    rightPoints.push(right[2]);
    rightPoints.push(...scallop(right[2], right[3], right[0], dsi.chamfer, 1));

    result["right"] = vPlateGen(rightPoints, point, dsi.stiffThickness, [1], dsi.scallopRadius, null, null, [], [1, 2]);
    // {
    //   points: rightPoints,
    //   Thickness: dsi.stiffThickness,
    //   z: -dsi.stiffThickness / 2,
    //   rotationX: Math.PI / 2,
    //   rotationY: rotationY,
    //   hole: [],
    //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    // }
    return result
  }

  function DYdia6(webPoints, point, urib, lrib, ds) {
    let result = {};
    let dsi = {
      webThickness: 12,
      hstiffWidth: 270,
      hstiffWidth2: 200,
      hstiffThickness: 12,
      hstiffHeight: 610,
      scallopRadius: 35,
      ribHoleD: 42,
      ribHoleR: 25,
      holeBottomY: 550, //y축은 중앙이 기준
      holeCenterOffset: -679,
      holeWidth: 450,
      holeHeight: 700,
      holeFilletR: 100,
      holeStiffThickness: 10,
      holeStiffhl: 610,
      holeStiffvl: 860,
      holeStiffmargin: 20,
      holeStiffHeight: 100,
      supportStiffLayout: [-200, 0, 200],
      supportStiffWidth: 265,
      supportStiffThickness: 26,
    }; //  임시 입력변수
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);
    const gradient = (tr.y - tl.y) / (tr.x - tl.x);

    let urib2 = urib;
    urib2.ribHoleD = dsi.ribHoleD;
    urib2.ribHoleR = dsi.ribHoleR;
    let lrib2 = lrib;
    lrib2.ribHoleD = dsi.ribHoleD;
    lrib2.ribHoleR = dsi.ribHoleR;
    lrib.type = 1; //하부리브 스캘럽

    let holeRect = [{ x: dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY }, { x: -dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY },
    { x: -dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY + dsi.holeHeight }, { x: dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY + dsi.holeHeight }];
    let holePoints = [];
    holePoints.push(...Fillet2D(holeRect[0], holeRect[1], holeRect[2], dsi.holeFilletR, 4));
    holePoints.push(...Fillet2D(holeRect[1], holeRect[2], holeRect[3], dsi.holeFilletR, 4));
    holePoints.push(...Fillet2D(holeRect[2], holeRect[3], holeRect[0], dsi.holeFilletR, 4));
    holePoints.push(...Fillet2D(holeRect[3], holeRect[0], holeRect[1], dsi.holeFilletR, 4));
    result["mainPlate"] = vPlateGen([bl, br, tr, tl], point, dsi.webThickness, [0, 1, 2, 3], dsi.scallopRadius, urib2, lrib2, holePoints, [2, 3], [0, 1, 2, 3]);

    let holeCenter1 = { x: dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness };
    let hstiff1 = [{ x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 }, { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 },
    { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }, { x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }];
    let hstiff2D1 = [{ x: dsi.holeCenterOffset - dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness },
    { x: dsi.holeCenterOffset + dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness },
    { x: dsi.holeCenterOffset + dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin },
    { x: dsi.holeCenterOffset - dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin }];
    result["hstiff1"] = hPlateGen(hstiff1, ToGlobalPoint(point, holeCenter1), dsi.holeStiffThickness, 0, point.skew, 0, 0, hstiff2D1, false, [1, 2]);
    let holeCenter2 = { x: dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin };
    let hstiff2D2 = [{ x: dsi.holeCenterOffset - dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin + dsi.holeStiffThickness },
    { x: dsi.holeCenterOffset + dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin + dsi.holeStiffThickness },
    { x: dsi.holeCenterOffset + dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin },
    { x: dsi.holeCenterOffset - dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin }];
    result["hstiff2"] = hPlateGen(hstiff1, ToGlobalPoint(point, holeCenter2), dsi.holeStiffThickness, 0, point.skew, 0, 0, hstiff2D2, true, [1, 2]);
    let holeCenter3 = { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 };
    let vstiff1 = [{ x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 }, { x: dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 },
    { x: dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }, { x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }];
    let vstiff2D1 = [{ x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 },
    { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
    { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
    { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 }];
    result["vstiff1"] = hPlateGen(vstiff1, ToGlobalPoint(point, holeCenter3), dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2, vstiff2D1, true, [1, 2]);
    let holeCenter4 = { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 };
    let vstiff2D2 = [{ x: dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 },
    { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
    { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
    { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 }];
    result["vstiff2"] = hPlateGen(vstiff1, ToGlobalPoint(point, holeCenter4), dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2, vstiff2D2, true);


    for (let i in dsi.supportStiffLayout) {
      let supportStiffCenter1 = { x: dsi.supportStiffLayout[i], y: tl.y + gradient * (dsi.supportStiffLayout[i] - tl.x) };
      let supportStiff1 = [{ x: 0, y: dsi.webThickness / 2 }, { x: supportStiffCenter1.y - bl.y, y: dsi.webThickness / 2 },
      { x: supportStiffCenter1.y - bl.y, y: dsi.supportStiffWidth + dsi.webThickness / 2 }, { x: 0, y: dsi.supportStiffWidth + dsi.webThickness / 2 }];
      let supportStiff2 = [{ x: 0, y: -dsi.webThickness / 2 }, { x: supportStiffCenter1.y - bl.y, y: -dsi.webThickness / 2 },
      { x: supportStiffCenter1.y - bl.y, y: - dsi.supportStiffWidth - dsi.webThickness / 2 }, { x: 0, y: - dsi.supportStiffWidth - dsi.webThickness / 2 }];
      let supportStiff2D = [
        { x: dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2, y: tl.y + gradient * (dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2 - tl.x) },
        { x: dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2, y: bl.y },
        { x: dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2, y: bl.y },
        { x: dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2, y: tl.y + gradient * (dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2 - tl.x) }
      ];
      result["supportStiff1" + i] = hPlateGen(supportStiff1, ToGlobalPoint(point, supportStiffCenter1), dsi.supportStiffThickness, -dsi.supportStiffThickness / 2, point.skew, 0, Math.PI / 2, supportStiff2D, true);
      result["supportStiff2" + i] = hPlateGen(supportStiff2, ToGlobalPoint(point, supportStiffCenter1), dsi.supportStiffThickness, -dsi.supportStiffThickness / 2, point.skew, 0, Math.PI / 2, null, true);
    }

    let hStiffCenter = { x: 0, y: bl.y + dsi.hstiffHeight };
    // let h1 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.hstiffWidth - dsi.webThickness / 2 },
    //    { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: -dsi.holeStiffHeight - dsi.webThickness / 2 },
    // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: - dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.webThickness / 2 }];
    // result["h1"] = hPlateGen(h1, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);
    // let h11 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.hstiffWidth + dsi.webThickness / 2 }, { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.holeStiffHeight + dsi.webThickness / 2 },
    // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.webThickness / 2 }];
    // result["h11"] = hPlateGen(h11, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);
    let x0 = bl.x + lwCot * dsi.hstiffHeight;
    let x00 = dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness;
    let x1 = dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness;
    let x2 = dsi.supportStiffLayout[0] - dsi.supportStiffThickness / 2;
    let x3 = dsi.supportStiffLayout[0] + dsi.supportStiffThickness / 2;
    let x4 = dsi.supportStiffLayout[1] - dsi.supportStiffThickness / 2;
    let x5 = dsi.supportStiffLayout[1] + dsi.supportStiffThickness / 2;
    let x6 = dsi.supportStiffLayout[2] - dsi.supportStiffThickness / 2;
    let x7 = dsi.supportStiffLayout[2] + dsi.supportStiffThickness / 2;
    let x8 = br.x + rwCot * dsi.hstiffHeight;
    let w0 = dsi.webThickness / 2;
    let w1 = dsi.holeStiffHeight + dsi.webThickness / 2;
    let w2 = dsi.hstiffWidth2 + dsi.webThickness / 2;
    let w3 = dsi.hstiffWidth + dsi.webThickness / 2;

    let h2 = [
      [{ x: x0, y: -w3 }, { x: x00, y: -w1 }, { x: x00, y: - w0 }, { x: x0, y: - w0 }],
      [{ x: x1, y: -w1 }, { x: x2, y: -w2 }, { x: x2, y: - w0 }, { x: x1, y: - w0 }],
      [{ x: x3, y: -w2 }, { x: x4, y: -w2 }, { x: x4, y: - w0 }, { x: x3, y: - w0 }],
      [{ x: x5, y: -w2 }, { x: x6, y: -w2 }, { x: x6, y: - w0 }, { x: x5, y: - w0 }],
      [{ x: x7, y: -w2 }, { x: x8, y: -w3 }, { x: x8, y: - w0 }, { x: x7, y: - w0 }]];
    let h3 = [
      [{ x: x0, y: w3 }, { x: x00, y: w1 }, { x: x00, y: w0 }, { x: x0, y: w0 }],
      [{ x: x1, y: w1 }, { x: x2, y: w2 }, { x: x2, y: w0 }, { x: x1, y: w0 }],
      [{ x: x3, y: w2 }, { x: x4, y: w2 }, { x: x4, y: w0 }, { x: x3, y: w0 }],
      [{ x: x5, y: w2 }, { x: x6, y: w2 }, { x: x6, y: w0 }, { x: x5, y: w0 }],
      [{ x: x7, y: w2 }, { x: x8, y: w3 }, { x: x8, y: w0 }, { x: x7, y: w0 }]];
    let cpt = ToGlobalPoint(point, hStiffCenter);
    for (let i in h2) {
      let h2D = [{ x: h2[i][0].x, y: hStiffCenter.y },
      { x: h2[i][1].x, y: hStiffCenter.y },
      { x: h2[i][1].x, y: hStiffCenter.y + dsi.hstiffThickness },
      { x: h2[i][0].x, y: hStiffCenter.y + dsi.hstiffThickness }];
      result["h2" + i] = hPlateGen(h2[i], cpt, dsi.hstiffThickness, 0, point.skew, 0, 0, h2D, true);
      result["h3" + i] = hPlateGen(h3[i], cpt, dsi.hstiffThickness, 0, point.skew, 0, 0, null, true);
    }
    return result
  }

  function DYdia5(webPoints, point, urib, lrib, ds) {
    let result = {};
    let dsi = {
      webThickness: 12,
      hstiffWidth: 270,
      hstiffThickness: 12,
      hstiffHeight: 362,
      scallopRadius: 35,
      ribHoleD: 42,
      ribHoleR: 25,
      holeBottomY: 330, //y축은 중앙이 기준
      holeWidth: 700,
      holeHeight: 700,
      holeFilletR: 100,
      holeStiffThickness: 10,
      holeStiffhl: 860,
      holeStiffvl: 860,
      holeStiffmargin: 20,
      holeStiffHeight: 100,

    }; //  임시 입력변수
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);

    let urib2 = urib;
    urib2.ribHoleD = dsi.ribHoleD;
    urib2.ribHoleR = dsi.ribHoleR;
    let lrib2 = lrib;
    lrib2.ribHoleD = dsi.ribHoleD;
    lrib2.ribHoleR = dsi.ribHoleR;
    lrib.type = 0; //하부리브 스캘럽
    let holeRect = [{ x: dsi.holeWidth / 2, y: bl.y + dsi.holeBottomY }, { x: -dsi.holeWidth / 2, y: bl.y + dsi.holeBottomY },
    { x: -dsi.holeWidth / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight }, { x: dsi.holeWidth / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight }];
    let holePoints = [];
    holePoints.push(...Fillet2D(holeRect[0], holeRect[1], holeRect[2], dsi.holeFilletR, 4));
    holePoints.push(...Fillet2D(holeRect[1], holeRect[2], holeRect[3], dsi.holeFilletR, 4));
    holePoints.push(...Fillet2D(holeRect[2], holeRect[3], holeRect[0], dsi.holeFilletR, 4));
    holePoints.push(...Fillet2D(holeRect[3], holeRect[0], holeRect[1], dsi.holeFilletR, 4));
    result["mainPlate"] = vPlateGen([bl, br, tr, tl], point, dsi.webThickness, [0, 1, 2, 3], dsi.scallopRadius, urib2, lrib2, holePoints, [2, 3], [0, 1, 2, 3]);

    let holeCenter1 = { x: 0, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness };
    let hstiff1 = [{ x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 }, { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 },
    { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }, { x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }];
    let hstiff2D1 = [{ x: -dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness },
    { x: dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness },
    { x: dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin },
    { x: -dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin }];
    result["hstiff1"] = hPlateGen(hstiff1, ToGlobalPoint(point, holeCenter1), dsi.holeStiffThickness, 0, point.skew, 0, 0, hstiff2D1, false, [1, 2]);

    let holeCenter2 = { x: 0, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin };
    let hstiff2D2 = [{ x: -dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin + dsi.holeStiffThickness },
    { x: dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin + dsi.holeStiffThickness },
    { x: dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin },
    { x: -dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin }];
    result["hstiff2"] = hPlateGen(hstiff1, ToGlobalPoint(point, holeCenter2), dsi.holeStiffThickness, 0, point.skew, 0, 0, hstiff2D2, true, [1, 2]);

    let holeCenter3 = { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 };
    let vstiff1 = [{ x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 }, { x: dsi.holeStiffhl / 2, y: -dsi.webThickness / 2 },
    { x: dsi.holeStiffhl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }, { x: -dsi.holeStiffhl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }];
    let vstiff2D1 = [{ x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 },
    { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
    { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
    { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 }];
    result["vstiff1"] = hPlateGen(vstiff1, ToGlobalPoint(point, holeCenter3), dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2, vstiff2D1, true, [0, 1]);

    let holeCenter4 = { x: dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 };
    let vstiff2D2 = [{ x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 },
    { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
    { x: dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
    { x: dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 }];
    result["vstiff2"] = hPlateGen(vstiff1, ToGlobalPoint(point, holeCenter4), dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2, vstiff2D2, true);

    let hStiffCenter = { x: 0, y: bl.y + dsi.hstiffHeight };
    let h1 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.hstiffWidth - dsi.webThickness / 2 }, { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: -dsi.holeStiffHeight - dsi.webThickness / 2 },
    { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: - dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.webThickness / 2 }
    ];
    let h2D1 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: bl.y + dsi.hstiffHeight },
    { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.hstiffHeight },
    { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.hstiffHeight + dsi.hstiffThickness },
    { x: bl.x + lwCot * (dsi.hstiffHeight + dsi.hstiffThickness), y: bl.y + dsi.hstiffHeight + dsi.hstiffThickness }
    ];
    result["h1"] = hPlateGen(h1, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0, h2D1);

    let h2 = [{ x: br.x + rwCot * dsi.hstiffHeight, y: - dsi.hstiffWidth - dsi.webThickness / 2 }, { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: -dsi.holeStiffHeight - dsi.webThickness / 2 },
    { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: - dsi.webThickness / 2 }, { x: br.x + rwCot * dsi.hstiffHeight, y: - dsi.webThickness / 2 }
    ];
    let h2D2 = [{ x: br.x + rwCot * dsi.hstiffHeight, y: bl.y + dsi.hstiffHeight },
    { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: bl.y + dsi.hstiffHeight },
    { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: bl.y + dsi.hstiffHeight + dsi.hstiffThickness },
    { x: br.x + rwCot * (dsi.hstiffHeight + dsi.hstiffThickness), y: bl.y + dsi.hstiffHeight + dsi.hstiffThickness }
    ];
    result["h2"] = hPlateGen(h2, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0, h2D2);

    let h3 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.hstiffWidth + dsi.webThickness / 2 }, { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.holeStiffHeight + dsi.webThickness / 2 },
    { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.webThickness / 2 }
    ];
    result["h3"] = hPlateGen(h3, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);
    let h4 = [{ x: br.x + rwCot * dsi.hstiffHeight, y: dsi.hstiffWidth + dsi.webThickness / 2 }, { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: dsi.holeStiffHeight + dsi.webThickness / 2 },
    { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: dsi.webThickness / 2 }, { x: br.x + rwCot * dsi.hstiffHeight, y: dsi.webThickness / 2 }
    ];
    result["h4"] = hPlateGen(h4, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);
    return result
  }

  function DYdia4(webPoints, point, skew, urib, ds) {

    let result = {};
    let dsi = {
      webHeight: 576,//상부플렌지를 기준으로 보강재의 높이를 의미함, 명칭변경필요
      // lowerThickness: 12,
      // lowerWidth: 250,
      // upperThickness: 12,
      // upperWidth: 250,
      upperTopThickness: 10,
      upperTopWidth: 200,
      webThickness: 12,
      stiffWidth: 160,
      stiffThickness: 12,
      scallopRadius: 35,
      ribHoleD: 42,
      ribHoleR: 25,
    }; //  임시 입력변수
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const rotationY = (point.skew - 90) * Math.PI / 180;
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);
    const gradient = (tr.y - tl.y) / (tr.x - tl.x);
    const gradCos = (tr.x - tl.x) / Math.sqrt((tr.x - tl.x) ** 2 + (tr.y - tl.y) ** 2);
    // const gradSin = gradient * gradCos

    let webPlate = [{ x: tl.x - lwCot * dsi.webHeight, y: tl.y - dsi.webHeight },
    { x: tr.x - rwCot * dsi.webHeight, y: tr.y - dsi.webHeight }, tr, tl]; // 첫번째 면이 rib에 해당되도록
    let urib2 = urib;
    urib2.ribHoleD = dsi.ribHoleD;
    urib2.ribHoleR = dsi.ribHoleR;
    result["webPlate"] = vPlateGen(webPlate, point, dsi.webThickness, [0, 1, 2, 3], dsi.scallopRadius, urib2, null, [], [2, 3], [0, 1, 2, 3]);

    let centerPoint = ToGlobalPoint(point, { x: 0, y: -gradient * tl.x + tl.y - dsi.webHeight - dsi.upperTopThickness });
    // let l = (tr.x - rwCot * (dsi.webHeight + dsi.upperTopThickness)) - (tl.x - lwCot * (dsi.webHeight + dsi.upperTopThickness)) / gradCos
    let webBottomPlate2 = [{ x: (tl.x - lwCot * (dsi.webHeight + dsi.upperTopThickness)) / gradCos, y: - dsi.upperTopWidth / 2 },
    { x: (tl.x - lwCot * (dsi.webHeight + dsi.upperTopThickness)) / gradCos, y: dsi.upperTopWidth / 2 },
    { x: (tr.x - rwCot * (dsi.webHeight + dsi.upperTopThickness)) / gradCos, y: dsi.upperTopWidth / 2 },
    { x: (tr.x - rwCot * (dsi.webHeight + dsi.upperTopThickness)) / gradCos, y: -dsi.upperTopWidth / 2 }];
    let webBottomPlate = [webPlate[0],
    { x: tl.x - lwCot * (dsi.webHeight + dsi.upperTopThickness), y: tl.y - dsi.webHeight - dsi.upperTopThickness },
    { x: tr.x - rwCot * (dsi.webHeight + dsi.upperTopThickness), y: tr.y - dsi.webHeight - dsi.upperTopThickness },
    webPlate[1]
    ];
    result["webBottomPlate"] = hPlateGen(webBottomPlate2, centerPoint, dsi.upperTopThickness, 0, point.skew, 0, -Math.atan(gradient), webBottomPlate, false, [0, 1]);
    let stiffnerPoint = [[bl, webBottomPlate[1]],
    [br, webBottomPlate[2]]];
    for (let i = 0; i < stiffnerPoint.length; i++) {
      let stiffWidth = i % 2 === 0 ? dsi.stiffWidth : -dsi.stiffWidth;
      let stiffner = PlateRestPoint(stiffnerPoint[i][0], stiffnerPoint[i][1], 0, gradient, stiffWidth);
      let side2D = i % 2 === 0 ? null : [0, 3, 2, 1];
      result["stiffner" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], null, side2D);
    }

    return result
  }


  function DYdia3(webPoints, point, skew, uflange, ds) {
    let result = {};
    let dsi = {
      webHeight: 576,//상부플렌지를 기준으로 보강재의 높이를 의미함, 명칭변경필요
      flangeThickness: 12,
      flangeWidth: 250,
      // upperHeight: 900,
      webThickness: 12,
      stiffWidth: 150,
      stiffThickness: 12,
      scallopRadius: 35,
      bracketWidth: 450,
      bracketLength: 529,
      bracketScallopR: 100,
      webJointWidth: 330,
      webJointHeight: 440,
      webJointThickness: 10,
      flangeJointLength: 480,
      flangeJointWidth: 80,
      flangeJointThickness: 10,
    }; //  임시 입력변수
    // let xs = {
    //   webThickness: 12,
    //   flangeWidth: 250,
    //   flangeThickness: 12,
    //   webJointThickness: 10,
    //   webJointWidth: 330,
    //   webJointHeight: 440,
    //   flangeJointThickness: 10,
    //   flangeJointLength: 480,
    //   flangeJointWidth: 80,
    // }

    let wBolt = {
      P: 90,
      G: 75,
      pNum: 5,
      gNum: 2,
      dia: 22,
      size: 37,
      t: 14,
    };
    let fBolt = {
      P: 170,
      G: 75,
      pNum: 2,
      gNum: 3,
      dia: 22,
      size: 37,
      t: 14,
    };
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const rotationY = (point.skew - 90) * Math.PI / 180;
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);
    const gradient = (tr.y - tl.y) / (tr.x - tl.x);
    const gradCos = (tr.x - tl.x) / Math.sqrt((tr.x - tl.x) ** 2 + (tr.y - tl.y) ** 2);
    const gradSin = gradient * gradCos;
    const gradRadian = -Math.atan(gradient);

    let upperPlate = [
      uflange[0][1],
      { x: uflange[0][1].x - gradSin * dsi.flangeThickness, y: uflange[0][1].y + gradCos * dsi.flangeThickness },
      { x: uflange[1][1].x - gradSin * dsi.flangeThickness, y: uflange[1][1].y + gradCos * dsi.flangeThickness },
      uflange[1][1]
    ];
    let lowerPlate = [
      { x: tl.x - lwCot * dsi.webHeight, y: tl.y - dsi.webHeight },
      { x: tl.x - lwCot * (dsi.webHeight + dsi.flangeThickness), y: tl.y - dsi.webHeight - dsi.flangeThickness },
      { x: tr.x - rwCot * (dsi.webHeight + dsi.flangeThickness), y: tr.y - dsi.webHeight - dsi.flangeThickness },
      { x: tr.x - rwCot * dsi.webHeight, y: tr.y - dsi.webHeight }
    ];

    let bracketPoint = [ToGlobalPoint(point, lowerPlate[1]),
    ToGlobalPoint(point, lowerPlate[2]),
    ToGlobalPoint(point, upperPlate[0]),
    ToGlobalPoint(point, upperPlate[3])];
    let bracketSide = [[lowerPlate[0], lowerPlate[1]],
    [lowerPlate[3], lowerPlate[2]],
    [upperPlate[0], upperPlate[1]],
    [upperPlate[3], upperPlate[2]]];
    for (let i = 0; i < 4; i++) {
      let sign = i % 2 === 0 ? 1 : -1;
      let bracketLength = i < 2 ? dsi.bracketLength : dsi.bracketLength - (uflange[0][1].x - tl.x);
      let bracket2D = PlateRestPoint(bracketSide[i][0], bracketSide[i][1], gradient, gradient, sign * bracketLength);
      let lowerbracket1 = [{ x: 0, y: dsi.bracketWidth / 2 }, { x: sign * 20, y: dsi.bracketWidth / 2 }, { x: sign * 20, y: dsi.flangeWidth / 2 }, { x: sign * bracketLength, y: dsi.flangeWidth / 2 },
      { x: sign * bracketLength, y: -dsi.flangeWidth / 2 }, { x: sign * 20, y: -dsi.flangeWidth / 2 }, { x: sign * 20, y: -dsi.bracketWidth / 2 }, { x: 0, y: -dsi.bracketWidth / 2 }];
      let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], dsi.bracketScallopR, 4),
      lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], dsi.bracketScallopR, 4),
      lowerbracket1[6], lowerbracket1[7]];
      let top2D = i < 2 ? false : true;
      result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, bracketPoint[i], dsi.flangeThickness, 0, point.skew, 0, gradRadian, bracket2D, top2D);
      // {
      //   points: bracketShape,
      //   Thickness: i < 2 ? dsi.flangeThickness : dsi.flangeThickness,
      //   z: 0,
      //   rotationX: 0,
      //   rotationY: gradRadian,
      //   hole: [],
      //   point: bracketPoint[i],
      //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
      //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
      // }
    }

    let stiffnerPoint = [[bl, lowerPlate[1]], [br, lowerPlate[2]]];
    for (let i = 0; i < stiffnerPoint.length; i++) {
      let stiffWidth = i % 2 === 0 ? dsi.stiffWidth : -dsi.stiffWidth;
      let stiffner = PlateRestPoint(stiffnerPoint[i][0], stiffnerPoint[i][1], 0, gradient, stiffWidth);
      let side2D = i % 2 === 0 ? null : [0, 3, 2, 1];
      result["stiffner" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], null, side2D);
    }
    let webBracketPoint = [[lowerPlate[0], tl], [lowerPlate[3], tr]];
    for (let i = 0; i < webBracketPoint.length; i++) {
      let stiffWidth = i % 2 === 0 ? dsi.bracketLength : -dsi.bracketLength;
      let stiffner = PlateRestPoint(webBracketPoint[i][0], webBracketPoint[i][1], gradient, gradient, stiffWidth);
      result["webBracket" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], [1, 2]);
    }

    let webPlate = [{ x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y + dsi.bracketLength * gradient },
    { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y - dsi.bracketLength * gradient },
    { x: tr.x - dsi.bracketLength, y: tr.y - dsi.bracketLength * gradient },
    { x: tl.x + dsi.bracketLength, y: tl.y + dsi.bracketLength * gradient }];

    result["webPlate"] = vPlateGen(webPlate, point, dsi.webThickness, [], dsi.scallopRadius, null, null, [], [2, 3], [0, 1, 2, 3]);

    let upperflange = [
      { x: tl.x + dsi.bracketLength, y: tl.y + dsi.bracketLength * gradient },
      { x: tl.x + dsi.bracketLength, y: tl.y + dsi.bracketLength * gradient + dsi.flangeThickness },
      { x: tr.x - dsi.bracketLength, y: tr.y - dsi.bracketLength * gradient + dsi.flangeThickness },
      { x: tr.x - dsi.bracketLength, y: tr.y - dsi.bracketLength * gradient }];
    let uPoint = ToGlobalPoint(point, { x: 0, y: -gradient * tl.x + tl.y });
    let upperflangeL = Math.sqrt((upperflange[3].x - upperflange[0].x) ** 2 + (upperflange[3].y - upperflange[0].y) ** 2);
    let upperflange2 = [{ x: -upperflangeL / 2, y: dsi.flangeWidth / 2 },
    { x: -upperflangeL / 2, y: - dsi.flangeWidth / 2 },
    { x: upperflangeL / 2, y: - dsi.flangeWidth / 2 },
    { x: upperflangeL / 2, y: dsi.flangeWidth / 2 }];
    result["upperflange"] = hPlateGen(upperflange2, uPoint, dsi.flangeThickness, 0, point.skew, 0, gradRadian, upperflange, true, [0, 1]);
    // result["upperflange"] = { points: upperflange, Thickness: dsi.flangeWidth, z: - dsi.flangeWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
    let lowerflange = [
      { x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y + dsi.bracketLength * gradient - dsi.flangeThickness },
      { x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y + dsi.bracketLength * gradient },
      { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y - dsi.bracketLength * gradient },
      { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y - dsi.bracketLength * gradient - dsi.flangeThickness }];
    let lPoint = ToGlobalPoint(point, { x: 0, y: -gradient * lowerflange[0].x + lowerflange[0].y });
    let lowerflangeL = Math.sqrt((lowerflange[3].x - lowerflange[0].x) ** 2 + (lowerflange[3].y - lowerflange[0].y) ** 2);
    let lowerflange2 = [{ x: -lowerflangeL / 2, y: dsi.flangeWidth / 2 },
    { x: -lowerflangeL / 2, y: - dsi.flangeWidth / 2 },
    { x: lowerflangeL / 2, y: - dsi.flangeWidth / 2 },
    { x: lowerflangeL / 2, y: dsi.flangeWidth / 2 }];
    result["lowerflange"] = hPlateGen(lowerflange2, lPoint, dsi.flangeThickness, 0, point.skew, 0, gradRadian, lowerflange, false, [0, 1]);
    // result["lowerflange"] = { points: lowerflange, Thickness: dsi.flangeWidth, z: - dsi.flangeWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }

    let joint = IbeamJoint(webPlate, point, dsi, wBolt, fBolt);
    for (let i in joint) { result[i] = joint[i]; }
    return result
  }


  function DYdia2(webPoints, point, skew, uflangePoint, ds) {
    let result = {};
    let dsi = {
      lowerHeight: 300,
      flangeThickness: 12,
      flangeWidth: 250,
      upperHeight: 900,
      webThickness: 12,
      stiffWidth: 150,
      stiffThickness: 12,
      scallopRadius: 35,
      bracketWidth: 450,
      bracketLength: 529,
      bracketScallopR: 100,
      webJointWidth: 330,
      webJointHeight: 440,
      webJointThickness: 10,
      flangeJointLength: 480,
      flangeJointWidth: 80,
      flangeJointThickness: 10,
    }; //  임시 입력변수

    // let xs = {
    //   webThickness: 12,
    //   flangeWidth: 250,
    //   flangeThickness: 12,
    //   webJointThickness: 10,
    //   webJointWidth: 330,
    //   webJointHeight: 440,
    //   flangeJointThickness: 10,
    //   flangeJointLength: 480,
    //   flangeJointWidth: 80,
    // }

    let wBolt = {
      P: 90,
      G: 75,
      pNum: 5,
      gNum: 2,
      size: 37,
      dia: 22,
      t: 14,
    };
    let fBolt = {
      P: 170,
      G: 75,
      pNum: 2,
      gNum: 3,
      dia: 22,
      size: 37,
      t: 14,
    };
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const rotationY = (point.skew - 90) * Math.PI / 180;
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);
    const gradient = (tr.y - tl.y) / (tr.x - tl.x);

    ///lower stiffener
    let lowerPlate = [
      { x: bl.x + lwCot * dsi.lowerHeight, y: bl.y + dsi.lowerHeight },
      { x: bl.x + lwCot * (dsi.lowerHeight - dsi.flangeThickness), y: bl.y + dsi.lowerHeight - dsi.flangeThickness },
      { x: br.x + rwCot * (dsi.lowerHeight - dsi.flangeThickness), y: br.y + dsi.lowerHeight - dsi.flangeThickness },
      { x: br.x + rwCot * dsi.lowerHeight, y: br.y + dsi.lowerHeight }
    ];
    let upperPlate = [
      { x: bl.x + lwCot * dsi.upperHeight, y: bl.y + dsi.upperHeight },
      { x: bl.x + lwCot * (dsi.upperHeight + dsi.flangeThickness), y: bl.y + dsi.upperHeight + dsi.flangeThickness },
      { x: br.x + rwCot * (dsi.upperHeight + dsi.flangeThickness), y: br.y + dsi.upperHeight + dsi.flangeThickness },
      { x: br.x + rwCot * dsi.upperHeight, y: br.y + dsi.upperHeight }
    ];
    let bracketPoint = [ToGlobalPoint(point, lowerPlate[1]),
    ToGlobalPoint(point, lowerPlate[2]),
    ToGlobalPoint(point, upperPlate[0]),
    ToGlobalPoint(point, upperPlate[3])];
    let bracketSide = [[lowerPlate[0], lowerPlate[1]],
    [lowerPlate[3], lowerPlate[2]],
    [upperPlate[1], upperPlate[0]],
    [upperPlate[2], upperPlate[3]],
    ];
    for (let i = 0; i < 4; i++) {
      let sign = i % 2 === 0 ? 1 : -1;
      let bracket2D = PlateRestPoint(bracketSide[i][0], bracketSide[i][1], 0, 0, sign * dsi.bracketLength);
      let lowerbracket1 = [{ x: 0, y: dsi.bracketWidth / 2 }, { x: sign * 20, y: dsi.bracketWidth / 2 }, { x: sign * 20, y: dsi.flangeWidth / 2 }, { x: sign * dsi.bracketLength, y: dsi.flangeWidth / 2 },
      { x: sign * dsi.bracketLength, y: -dsi.flangeWidth / 2 }, { x: sign * 20, y: -dsi.flangeWidth / 2 }, { x: sign * 20, y: -dsi.bracketWidth / 2 }, { x: 0, y: -dsi.bracketWidth / 2 }];
      let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], dsi.bracketScallopR, 4),
      lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], dsi.bracketScallopR, 4),
      lowerbracket1[6], lowerbracket1[7]];
      let thickness = i < 2 ? dsi.flangeThickness : dsi.flangeThickness;
      let top2D = i < 2 ? false : true;
      result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, bracketPoint[i], thickness, 0, point.skew, 0, 0, bracket2D, top2D);
    }
    let stiffnerPoint = [[bl, lowerPlate[1]],
    [br, lowerPlate[2]],
    [tl, upperPlate[1]],
    [tr, upperPlate[2]]];
    for (let i = 0; i < 4; i++) {
      let stiffWidth = i % 2 === 0 ? dsi.stiffWidth : -dsi.stiffWidth;
      let tan1 = i < 2 ? 0 : gradient;
      let stiffner = PlateRestPoint(stiffnerPoint[i][0], stiffnerPoint[i][1], tan1, 0, stiffWidth);
      let side2D = i % 2 === 0 ? null : [0, 3, 2, 1];
      result["stiffner" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], null, side2D);
    }

    let webBracketPoint = [[lowerPlate[0], upperPlate[0]], [lowerPlate[3], upperPlate[3]]];
    for (let i = 0; i < 2; i++) {
      let stiffWidth = i % 2 === 0 ? dsi.bracketLength : -dsi.bracketLength;
      let stiffner = PlateRestPoint(webBracketPoint[i][0], webBracketPoint[i][1], 0, 0, stiffWidth);
      result["webBracket" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.webThickness, [0, 1], dsi.scallopRadius, null, null, [], [1, 2]);
    }

    let webPlate = [{ x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y },
    { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y },
    { x: upperPlate[3].x - dsi.bracketLength, y: upperPlate[3].y },
    { x: upperPlate[0].x + dsi.bracketLength, y: upperPlate[0].y }];

    result["webPlate"] = vPlateGen(webPlate, point, dsi.webThickness, [], 0, null, null, [], [2, 3], [0, 1, 2, 3]);

    let upperflange = [{ x: upperPlate[0].x + dsi.bracketLength, y: upperPlate[0].y },
    { x: upperPlate[0].x + dsi.bracketLength, y: upperPlate[0].y + dsi.flangeThickness },
    { x: upperPlate[3].x - dsi.bracketLength, y: upperPlate[3].y + dsi.flangeThickness },
    { x: upperPlate[3].x - dsi.bracketLength, y: upperPlate[3].y }];
    let uPoint = ToGlobalPoint(point, upperflange[0]);
    let upperflangeL = upperPlate[3].x - upperPlate[0].x - 2 * dsi.bracketLength;
    let upperflange2 = [{ x: 0, y: dsi.flangeWidth / 2 },
    { x: 0, y: - dsi.flangeWidth / 2 },
    { x: upperflangeL, y: - dsi.flangeWidth / 2 },
    { x: upperflangeL, y: dsi.flangeWidth / 2 }];
    result["upperflange"] = hPlateGen(upperflange2, uPoint, dsi.flangeThickness, 0, point.skew, 0, 0, upperflange, true, [0, 1]);
    // { points: upperflange, Thickness: dsi.flangeWidth, z: - dsi.flangeWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
    let lowerflange = [{ x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y },
    { x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y - dsi.flangeThickness },
    { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y - dsi.flangeThickness },
    { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y }];
    let lPoint = ToGlobalPoint(point, lowerflange[1]);
    let lowerflangeL = lowerflange[3].x - lowerflange[0].x;
    let lowerflange2 = [{ x: 0, y: dsi.flangeWidth / 2 },
    { x: 0, y: - dsi.flangeWidth / 2 },
    { x: lowerflangeL, y: - dsi.flangeWidth / 2 },
    { x: lowerflangeL, y: dsi.flangeWidth / 2 }];
    result["lowerflange"] = hPlateGen(lowerflange2, lPoint, dsi.flangeThickness, 0, point.skew, 0, 0, lowerflange, false, [0, 1]);
    // { points: lowerflange, Thickness: dsi.flangeWidth, z: - dsi.flangeWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }

    let joint = IbeamJoint(webPlate, point, dsi, wBolt, fBolt);
    for (let i in joint) { result[i] = joint[i]; }

    return result
  }

  function DYdia0(webPoints, point, skew, lflangePoint, ds) {
    let result = {};
    let dsi = {
      // lowerHeight: 300,
      lowerThickness: 12,
      lowerWidth: 250,
      upperHeight: 576,
      upperThickness: 12,
      upperWidth: 250,
      centerThickness: 12,
      stiffWidth: 150,
      stiffWidth2: 300,
      filletR: 200,
      stiffThickness: 12,
      scallopRadius: 35,
    }; //  임시 입력변수

    // const topY = 270; // 슬래브두께 + 헌치값이 포함된 값. 우선 변수만 입력
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    // const rotationY = (skew - 90) * Math.PI / 180
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);
    const gradient = (tr.y - tl.y) / (tr.x - tl.x);

    ///lower stiffener
    let lowerPlate = [
      lflangePoint[0][1],
      { x: lflangePoint[0][1].x, y: lflangePoint[0][1].y - dsi.lowerThickness },
      { x: lflangePoint[1][1].x, y: lflangePoint[1][1].y - dsi.lowerThickness },
      lflangePoint[1][1]
    ];
    let lowerPlateL = lflangePoint[1][1].x - lflangePoint[0][1].x;
    let lowerPlate2 = [{ x: 0, y: dsi.lowerWidth / 2 }, { x: 0, y: -dsi.lowerWidth / 2 }, { x: lowerPlateL, y: -dsi.lowerWidth / 2 }, { x: lowerPlateL, y: dsi.lowerWidth / 2 }];
    let lPoint = ToGlobalPoint(point, lflangePoint[0][1]);
    result["lowerPlate"] = hPlateGen(lowerPlate2, lPoint, dsi.lowerThickness, - dsi.lowerThickness, point.skew, 0, 0, lowerPlate, false, [0, 1]);

    let upperPlate = [
      { x: bl.x + lwCot * dsi.upperHeight, y: bl.y + dsi.upperHeight },
      { x: bl.x + lwCot * (dsi.upperHeight + dsi.upperThickness), y: bl.y + dsi.upperHeight + dsi.upperThickness },
      { x: br.x + rwCot * (dsi.upperHeight + dsi.upperThickness), y: br.y + dsi.upperHeight + dsi.upperThickness },
      { x: br.x + rwCot * dsi.upperHeight, y: br.y + dsi.upperHeight }
    ];
    let upperPlateL = upperPlate[3].x - upperPlate[0].x;
    let upperPlate2 = [{ x: 0, y: dsi.upperWidth / 2 }, { x: 0, y: -dsi.upperWidth / 2 }, { x: upperPlateL, y: - dsi.upperWidth / 2 }, { x: upperPlateL, y: dsi.upperWidth / 2 }];
    let uPoint = ToGlobalPoint(point, upperPlate[0]);
    result["upperPlate"] = hPlateGen(upperPlate2, uPoint, dsi.upperThickness, 0, point.skew, 0, 0, upperPlate, true, [0, 1]);

    let centerPlate = [bl, br, upperPlate[3], upperPlate[0]];
    result["centerPlate"] = vPlateGen(centerPlate, point, dsi.centerThickness, [0, 1, 2, 3], dsi.scallopRadius, null, null, [], [2, 3], [0, 1, 2, 3]);

    let stiffnerPoint = [tl, upperPlate[1]];
    let stiffWidth = dsi.stiffWidth;
    let tan1 = gradient;
    let stiffner = PlateRestPoint(stiffnerPoint[0], stiffnerPoint[1], tan1, 0, stiffWidth);
    let addedPoint = [{ x: upperPlate[1].x + dsi.stiffWidth2, y: upperPlate[1].y },
    { x: upperPlate[1].x + dsi.stiffWidth2, y: upperPlate[1].y + 50 },
    { x: upperPlate[1].x + dsi.stiffWidth, y: upperPlate[1].y + 50 + dsi.stiffWidth2 - dsi.stiffWidth }];

    let stiffnerPoints = [];
    stiffnerPoints.push(...scallop(stiffner[3], stiffner[0], stiffner[1], dsi.scallopRadius, 4));
    stiffnerPoints.push(...scallop(stiffner[0], stiffner[1], stiffner[2], dsi.scallopRadius, 4));
    stiffnerPoints.push(addedPoint[0], addedPoint[1]);
    stiffnerPoints.push(...Fillet2D(addedPoint[1], addedPoint[2], stiffner[3], dsi.filletR, 4));
    stiffnerPoints.push(stiffner[3]);
    result["stiffner1"] = vPlateGen(stiffnerPoints, point, dsi.stiffThickness, [], dsi.scallopRadius, null, null, []);

    stiffnerPoint = [tr, upperPlate[2]];
    tan1 = gradient;
    stiffner = PlateRestPoint(stiffnerPoint[0], stiffnerPoint[1], tan1, 0, -stiffWidth);
    addedPoint = [{ x: upperPlate[2].x - dsi.stiffWidth2, y: upperPlate[2].y },
    { x: upperPlate[2].x - dsi.stiffWidth2, y: upperPlate[2].y + 50 },
    { x: upperPlate[2].x - dsi.stiffWidth, y: upperPlate[2].y + 50 + dsi.stiffWidth2 - dsi.stiffWidth }];
    stiffnerPoints = [];
    stiffnerPoints.push(stiffner[0]);
    stiffnerPoints.push(stiffner[1]);
    stiffnerPoints.push(addedPoint[0], addedPoint[1]);
    stiffnerPoints.push(...Fillet2D(addedPoint[1], addedPoint[2], stiffner[3], dsi.filletR, 4));
    stiffnerPoints.push(stiffner[3]);
    result["stiffner2"] = vPlateGen(stiffnerPoints, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], null, [1, 2, 10, 0]);

    return result
  }

  function DYdia1(webPoints, point, skew, uflangePoint, ds) {
    //ds 입력변수
    let result = {};
    let dsi = {
      lowerHeight: 300,
      lowerThickness: 12,
      lowerWidth: 250,
      upperHeight: 900,
      upperThickness: 12,
      upperWidth: 250,
      centerThickness: 12,
      stiffWidth: 150,
      stiffThickness: 12,
      scallopRadius: 35,
    }; //  임시 입력변수
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);
    const gradient = (tr.y - tl.y) / (tr.x - tl.x);
    ///lower stiffener
    let lowerPlate = [
      { x: bl.x + lwCot * dsi.lowerHeight, y: bl.y + dsi.lowerHeight },
      { x: bl.x + lwCot * (dsi.lowerHeight - dsi.lowerThickness), y: bl.y + dsi.lowerHeight - dsi.lowerThickness },
      { x: br.x + rwCot * (dsi.lowerHeight - dsi.lowerThickness), y: br.y + dsi.lowerHeight - dsi.lowerThickness },
      { x: br.x + rwCot * dsi.lowerHeight, y: br.y + dsi.lowerHeight }
    ];
    let lowerPlateL = lowerPlate[3].x - lowerPlate[0].x;
    let lowerPlate2 = [{ x: 0, y: dsi.lowerWidth / 2 }, { x: 0, y: -dsi.lowerWidth / 2 }, { x: lowerPlateL, y: -dsi.lowerWidth / 2 }, { x: lowerPlateL, y: dsi.lowerWidth / 2 }];
    let lPoint = ToGlobalPoint(point, lowerPlate[0]);
    result["lowerPlate"] = hPlateGen(lowerPlate2, lPoint, dsi.lowerThickness, -dsi.lowerThickness, point.skew, 0, 0, lowerPlate, false, [0, 1]);

    let upperPlate = [
      { x: bl.x + lwCot * dsi.upperHeight, y: bl.y + dsi.upperHeight },
      { x: bl.x + lwCot * (dsi.upperHeight + dsi.upperThickness), y: bl.y + dsi.upperHeight + dsi.upperThickness },
      { x: br.x + rwCot * (dsi.upperHeight + dsi.upperThickness), y: br.y + dsi.upperHeight + dsi.upperThickness },
      { x: br.x + rwCot * dsi.upperHeight, y: br.y + dsi.upperHeight }
    ];
    let upperPlateL = upperPlate[3].x - upperPlate[0].x;
    let upperPlate2 = [{ x: 0, y: dsi.upperWidth / 2 }, { x: 0, y: -dsi.upperWidth / 2 }, { x: upperPlateL, y: - dsi.upperWidth / 2 }, { x: upperPlateL, y: dsi.upperWidth / 2 }];
    let uPoint = ToGlobalPoint(point, upperPlate[0]);
    result["upperPlate"] = hPlateGen(upperPlate2, uPoint, dsi.upperThickness, 0, point.skew, 0, 0, upperPlate, true, [0, 1]);

    let centerPlate = [lowerPlate[0], lowerPlate[3], upperPlate[3], upperPlate[0]];
    result["centerPlate"] = vPlateGen(centerPlate, point, dsi.centerThickness, [0, 1, 2, 3], dsi.scallopRadius, null, null, [], [2, 3], [0, 1, 2, 3]);

    let stiffnerPoint = [[bl, lowerPlate[1]],
    [br, lowerPlate[2]],
    [tl, upperPlate[1]],
    [tr, upperPlate[2]]];
    for (let i = 0; i < 4; i++) {
      let stiffWidth = i % 2 === 0 ? dsi.stiffWidth : -dsi.stiffWidth;
      let tan1 = i < 2 ? 0 : gradient;
      let stiffner = PlateRestPoint(stiffnerPoint[i][0], stiffnerPoint[i][1], tan1, 0, stiffWidth);
      let side2D = i % 2 === 0 ? [0, 3, 2, 1] : null;
      result["stiffner" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], null, side2D);
    }
    return result
  }

  function uBoxDia1(webPoints, point, skew, uflangePoint, uflange, lrib, ds, sectionDB) { //ribPoint needed
    // webPoint => lweb + rweb  inner 4points(bl, tl, br, tr)
    const topY = 270; // 슬래브두께 + 헌치값이 포함된 값. 우선 변수만 입력
    let result = {};
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);
    const gradient = (tr.y - tl.y) / (tr.x - tl.x);

    ///lower stiffener
    let lowerPlate = [
      bl, br,
      { x: br.x + rwCot * ds.lowerHeight, y: br.y + ds.lowerHeight },
      { x: bl.x + lwCot * ds.lowerHeight, y: bl.y + ds.lowerHeight }
    ];
    let lowerTopPoints = [lowerPlate[3],
    { x: bl.x + lwCot * (ds.lowerHeight + ds.lowerTopThickness), y: bl.y + (ds.lowerHeight + ds.lowerTopThickness) },
    { x: br.x + rwCot * (ds.lowerHeight + ds.lowerTopThickness), y: bl.y + (ds.lowerHeight + ds.lowerTopThickness) },
    lowerPlate[2]];

    let lrib2 = lrib;
    lrib2.ribHoleD = ds.ribHoleD;
    lrib2.ribHoleR = ds.ribHoleR;
    lrib2.type = 0;
    // let lowerweldingLine = [lowerPlate[0], lowerPlate[1], lowerPlate[2], lowerPlate[3]]
    result["lowershape"] = vPlateGen(lowerPlate, point, ds.lowerThickness, [0, 1], ds.scallopRadius, null, lrib2, [], null, [0, 1, 2, 3]);
    // {
    //   points: lowerPoints, Thickness: ds.lowerThickness, z: -ds.lowerThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    //   size: PlateSize(lowerPlate, 1, ds.lowerThickness),
    //   anchor: [[lowerPlate[0].x, lowerPlate[0].y - 50], [lowerPlate[3].x, lowerPlate[3].y - 50]],
    //   welding: [{ Line: lowerweldingLine, type: "FF", value1: 6 }]
    // }
    let lowerTop = [{ x: lowerPlate[2].x, y: - ds.lowerTopwidth / 2 }, { x: lowerPlate[2].x, y: ds.lowerTopwidth / 2 },
    { x: lowerPlate[3].x, y: ds.lowerTopwidth / 2 }, { x: lowerPlate[3].x, y: - ds.lowerTopwidth / 2 }];
    let centerPoint = ToGlobalPoint(point, { x: 0, y: lowerPlate[2].y });
    result["lowerTopShape"] = hPlateGen(lowerTop, centerPoint, ds.lowerTopThickness, 0, skew, 0, 0, lowerTopPoints, false, [0, 1]);
    // {
    //   points: lowerTopPoints, Thickness: ds.lowerTopwidth, z: -ds.lowerTopwidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    //   size: PlateSize2(lowerPlate, 1, ds.lowerTopThickness, ds.lowerTopwidth),
    //   anchor: [[lowerTopPoints[1].x, lowerTopPoints[1].y + 50], [lowerTopPoints[2].x, lowerTopPoints[2].y + 50]]
    // }

    ///upper stiffener
    let upperPlate = [{ x: tl.x, y: tl.y }, { x: tl.x - lwCot * ds.upperHeight, y: tl.y - ds.upperHeight },
    { x: tr.x - rwCot * ds.upperHeight, y: tr.y - ds.upperHeight }, { x: tr.x, y: tr.y }];
    // let upperPoints = [...scallop(upperPlate[3], upperPlate[0], upperPlate[1], ds.scallopRadius, 4),
    // upperPlate[1], upperPlate[2], ...scallop(upperPlate[2], upperPlate[3], upperPlate[0], ds.scallopRadius, 4)];

    result["upper"] = vPlateGen(upperPlate, point, ds.upperThickness, [0, 3], ds.scallopRadius, null, null, [], [0, 3], [0, 3, 2, 1]);
    // {
    //   points: upperPoints, Thickness: ds.upperThickness, z: -ds.upperThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    //   size: PlateSize(upperPlate, 1, ds.upperThickness),
    //   anchor: [[upperPlate[0].x, upperPlate[0].y - 50], [upperPlate[3].x, upperPlate[3].y - 50]]
    // }

    //upperTopPlate
    let gradRadian = Math.atan(gradient);
    let gcos = Math.cos(gradRadian + Math.PI / 2);
    let gtan = Math.tan(gradRadian + Math.PI / 2);
    let gsin = Math.sin(gradRadian + Math.PI / 2);

    if (uflange[0].length > 0) {
      let upperTop = [
        { x: uflange[0][1].x, y: -ds.upperTopwidth / 2 }, { x: uflange[0][1].x, y: ds.upperTopwidth / 2 },
        { x: uflange[1][1].x, y: ds.upperTopwidth / 2 }, { x: uflange[1][1].x, y: - ds.upperTopwidth / 2 }
      ];
      let cp = ToGlobalPoint(point, { x: 0, y: tl.y - gradient * tl.x });
      let upperTopPoints = PlateRestPoint(uflange[0][1], uflange[1][1], gtan, gtan, ds.upperTopThickness);
      result["upperTopShape"] = hPlateGen(upperTop, cp, ds.upperTopThickness, 0, skew, 0, -gradRadian, upperTopPoints, true, [0, 1]);
      // {
      //   points: upperTopPoints, Thickness: ds.upperTopwidth, z: -ds.upperTopwidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
      //   size: PlateSize2(upperTopPoints, 0, ds.upperTopThickness, ds.upperTopwidth),
      //   anchor: [[upperTopPoints[0].x, upperTopPoints[0].y + 50], [upperTopPoints[1].x, upperTopPoints[1].y + 50]]
      // }
    }
    ////left side stiffner
    let leftPlate = PlateRestPoint(
      WebPoint(bl, tl, 0, bl.y + (ds.lowerHeight + ds.lowerTopThickness)),
      WebPoint(bl, tl, 0, tl.y - (ds.upperHeight + ds.leftsideTopThickness) * gsin), 0, gradient, ds.sideHeight);
    // let leftweldingLine = [leftPlate[3], leftPlate[0], leftPlate[1], leftPlate[2]]
    result["leftPlateShape"] = vPlateGen(leftPlate, point, ds.sideThickness, [], 0, null, null, [], null, [0, 3, 1, 2]);
    // {
    //   points: leftPlate, Thickness: ds.sideThickness, z: -ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    //   size: PlateSize(leftPlate, 0, ds.sideThickness),
    //   anchor: [[leftPlate[0].x + 50, leftPlate[0].y], [leftPlate[1].x + 50, leftPlate[1].y]],
    //   welding: [{ Line: leftweldingLine, type: "FF", value1: 6 }]
    // }
    //   ////right side stiffner
    let rightPlate = PlateRestPoint(
      WebPoint(br, tr, 0, br.y + (ds.lowerHeight + ds.lowerTopThickness)),
      WebPoint(br, tr, 0, tr.y - (ds.upperHeight + ds.leftsideTopThickness) * gsin), 0, gradient, -ds.sideHeight);
    result["rightPlateShape"] = vPlateGen(rightPlate, point, ds.sideThickness, [], 0, null, null, [], null, null);
    // {
    //   points: rightPlate, Thickness: ds.sideThickness, z: -ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    //   size: PlateSize(rightPlate, 0, ds.sideThickness),
    //   anchor: [[rightPlate[0].x - 50, rightPlate[0].y], [rightPlate[1].x - 50, rightPlate[1].y]]
    // }
    let cp1 = ToGlobalPoint(point, { x: 0, y: leftPlate[1].y - gradient * leftPlate[1].x });
    ////leftside top plate
    let leftTop = [
      { x: leftPlate[1].x / gsin, y: - ds.leftsideToplength / 2 }, { x: leftPlate[1].x / gsin, y: ds.leftsideToplength / 2 },
      { x: leftPlate[1].x / gsin + ds.leftsideTopwidth, y: ds.leftsideToplength / 2 }, { x: leftPlate[1].x / gsin + ds.leftsideTopwidth, y: - ds.leftsideToplength / 2 }
    ];

    let leftTopPlate = PlateRestPoint(
      upperPlate[1], { x: upperPlate[1].x + ds.leftsideTopwidth * gsin, y: upperPlate[1].y - ds.leftsideTopwidth * gcos },
      1 / lwCot, -1 / gradient, -ds.leftsideTopThickness);

    result["leftTopPlateShape"] = hPlateGen(leftTop, cp1, ds.leftsideTopThickness, 0, skew, 0, -gradRadian, leftTopPlate, true, [0, 1]);
    // {
    //   points: leftTopPlate, Thickness: ds.leftsideToplength, z: -ds.leftsideToplength / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    //   size: PlateSize2(leftTopPlate, 0, ds.leftsideTopThickness, ds.leftsideToplength),
    //   anchor: [[leftTopPlate[0].x + 50, leftTopPlate[0].y + 50], [leftTopPlate[1].x + 50, leftTopPlate[1].y + 50]]
    // }
    ////rightside top plate
    let rightTop = [
      { x: rightPlate[1].x / gsin, y: - ds.rightsideToplength / 2 }, { x: rightPlate[1].x / gsin, y: ds.rightsideToplength / 2 },
      { x: rightPlate[1].x / gsin - ds.rightsideTopwidth, y: ds.rightsideToplength / 2 }, { x: rightPlate[1].x / gsin - ds.rightsideTopwidth, y: - ds.rightsideToplength / 2 }
    ];
    let rightTopPlate = PlateRestPoint(
      upperPlate[2], { x: upperPlate[2].x - ds.rightsideTopwidth * gsin, y: upperPlate[2].y + ds.rightsideTopwidth * gcos },
      1 / rwCot, -1 / gradient, -ds.rightsideTopThickness);
    // let cp2 = ToGlobalPoint(point, rightPlate[1])
    result["rightTopPlateShape"] = hPlateGen(rightTop, cp1, ds.rightsideTopThickness, 0, skew, 0, -gradRadian, rightTopPlate, true, [0, 1]);
    // {
    //   points: rightTopPlate, Thickness: ds.rightsideToplength, z: -ds.rightsideToplength / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    //   size: PlateSize2(rightTopPlate, 0, ds.rightsideTopThickness, ds.rightsideToplength),
    //   anchor: [[rightTopPlate[1].x - 80, rightTopPlate[1].y + 50], [rightTopPlate[0].x - 80, rightTopPlate[0].y + 50]]
    // }
    // k-frame diaphragm
    let leftline = [{ x: -ds.spc * gsin, y: -topY - ds.spc * gcos }, lowerTopPoints[1]];
    let lcos = (leftline[1].x - leftline[0].x) / Math.sqrt((leftline[1].x - leftline[0].x) ** 2 + (leftline[1].y - leftline[0].y) ** 2);
    let ltan = (leftline[1].y - leftline[0].y) / (leftline[1].x - leftline[0].x);
    let lsin = lcos * ltan;
    // 슬래브 기준두께에 따라 브레이싱의 상단좌표가 이동해야 하나, 현재 기준은 0,0을 기준점으로 하고 있어 수정이 필요함 20.03.17 by drlim
    let pts = PTS(ds.dFrameName, false, 1, sectionDB);
    let newleftline = [
      { x: leftline[0].x - (ds.spc - lcos * pts[3]) / ltan, y: leftline[0].y - (ds.spc - lcos * pts[3]) },
      { x: leftline[1].x + (ds.spc - lsin * pts[3]), y: leftline[1].y + ltan * (ds.spc - lsin * pts[3]) }
    ];
    let [leftframe1, leftframe2] = Kframe(newleftline[1], newleftline[0], 0, 0, pts);
    result["leftframe1"] = vFrameGen(leftframe1, point, pts[4], ds.sideThickness / 2, null, null);
    result["leftframe2"] = vFrameGen(leftframe2, point, pts[5], ds.sideThickness / 2, null, null);

    // { points: leftframe1, Thickness: pts[4], z: ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [] }
    // result["leftframe2"] = 
    // {
    //   points: leftframe2, Thickness: pts[5], z: ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    //   size: { Label: "L-100x100x10x" + PointLength(...newleftline).toFixed(0) },
    //   anchor: [[newleftline[1].x - 20, newleftline[1].y], [newleftline[0].x - 20, newleftline[0].y]]
    // }

    let rightline = [{ x: ds.spc * gsin, y: -topY - ds.spc * gcos }, lowerTopPoints[2]];
    let rcos = (rightline[1].x - rightline[0].x) / Math.sqrt((rightline[1].x - rightline[0].x) ** 2 + (rightline[1].y - rightline[0].y) ** 2);
    let rtan = (rightline[1].y - rightline[0].y) / (rightline[1].x - rightline[0].x);
    let rsin = rcos * rtan;
    let newrightline = [
      { x: rightline[0].x - (ds.spc + rcos * pts[3]) / rtan, y: rightline[0].y - (ds.spc + rcos * pts[3]) },
      { x: rightline[1].x - (ds.spc - rsin * pts[3]), y: rightline[1].y - rtan * (ds.spc - rsin * pts[3]) }
    ];
    let [rightframe1, rightframe2] = Kframe(newrightline[0], newrightline[1], 0, 0, pts);
    result["rightframe1"] = vFrameGen(rightframe1, point, pts[4], ds.sideThickness / 2, null, null);
    result["rightframe2"] = vFrameGen(rightframe2, point, pts[5], ds.sideThickness / 2, null, null);
    // {
    //   points: rightframe2, Thickness: pts[5], z: ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    //   size: { Label: "L-100x100x10x" + PointLength(...newrightline).toFixed(0) },
    //   anchor: [[newrightline[0].x + 20, newrightline[0].y], [newrightline[1].x + 20, newrightline[1].y]]
    // }
    return result
  }

  function boxDiaHole1(webPoints, point, skew, uflange, urib, lrib, diaSection) { //ribPoint needed
    // webPoint => lweb + rweb  inner 4points(bl, tl, br, tr)
    // dia6에서 가져옴 200811
    let result = {};
    let sign =  1 ;
    let dsi = {
      webThickness: diaSection.plateThickness,
      hstiffWidth: diaSection.hStiffWidth,
      hstiffWidth2: diaSection.vStiffWidth,
      hstiffThickness: diaSection.hStiffThickness,
      hstiffHeight: diaSection.hStiffBottomOffset,
      scallopRadius: diaSection.scallopRadius,
      ribHoleD: 42,
      ribHoleR: 25,
      holeBottomY: diaSection.holeBottomOffset, //y축은 중앙이 기준
      holeCenterOffset: sign * diaSection.holeRightOffset - sign * diaSection.holeWidth / 2,
      holeWidth: sign * diaSection.holeWidth,
      holeHeight: diaSection.holeHeight,
      holeFilletR: diaSection.holeFilletR,
      holeStiffThickness: diaSection.holeVstiffnerThickness,
      holeStiffhl: diaSection.holeHstiffnerLength,
      holeStiffvl: diaSection.holeVstiffnerLength,
      holeStiffmargin: diaSection.holeStiffSpacing,
      holeStiffHeight: diaSection.holeVstiffnerhight,
      supportStiffLayout: diaSection.vStiffLayout,
      supportStiffWidth: diaSection.vStiffWidth,
      supportStiffThickness: diaSection.vStiffThickness,
    }; //  임시 입력변수

    // const plateThickness = diaSection.plateThickness;
    // const holeBottomOffset = diaSection.holeBottomOffset;
    // const holeCenterOffset = diaSection.holeRightOffset - diaSection.holeWidth / 2;
    // const holeFilletR = diaSection.holeFilletR;
    // const holeHeight = diaSection.holeHeight;
    // const holeWidth = diaSection.holeWidth;
    // const vStiffThickness = diaSection.vStiffThickness;
    // const vStiffWidth = diaSection.vStiffWidth;
    // const vStiffLayout = diaSection.vStiffLayout;
    const topPlateWidth = diaSection.topPlateWidth;
    const topPlateThickness = diaSection.topPlateThickness;

    // const hStiffThickness = diaSection.hStiffThickness
    // const hStiffWidth = diaSection.hStiffWidth
    // const hStiffBottomOffset = diaSection.hStiffBottomOffset
    // let longiRibHeight = diaSection.longiRibHeight;
    // let longiRibRayout = diaSection.longiRibRayout;
    // const holeVstiffnerThickness = diaSection.holeVstiffnerThickness
    // const holeVstiffnerhight = diaSection.holeVstiffnerhight
    // const holeVstiffnerLength = diaSection.holeVstiffnerLength
    // const holeHstiffnerThickness = diaSection.holeHstiffnerThickness
    // const holeStiffHeight = diaSection.holeHstiffnerHeight
    // const holeStiffhl = diaSection.holeHstiffnerLength
    // const holeStiffmargin = diaSection.holeStiffSpacing
    // // added letiables
    // let scallopRadius = diaSection.scallopRadius;


    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const gradient = (tr.y - tl.y) / (tr.x - tl.x);
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);
    const ang90 = Math.PI / 2;

    let urib2 = urib;
    urib2.ribHoleD = dsi.ribHoleD;
    urib2.ribHoleR = dsi.ribHoleR;
    let lrib2 = lrib;
    lrib2.ribHoleD = dsi.ribHoleD;
    lrib2.ribHoleR = dsi.ribHoleR;
    lrib.type = 1; //하부리브 스캘럽
   //사다리꼴 모양의 윗변이 아랫변보다 항상 100이 더 크게 설정함. 향후 비율에 따라 수정이 필요
    let holeRect = [{ x: dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY }, { x: -dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY },
    { x: -dsi.holeWidth / 2 + dsi.holeCenterOffset - sign * 100, y: bl.y + dsi.holeBottomY + dsi.holeHeight }, { x: dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY + dsi.holeHeight }];
    let holePoints = [];
    holePoints.push(...Fillet2D(holeRect[0], holeRect[1], holeRect[2], dsi.holeFilletR, 4));
    holePoints.push(...Fillet2D(holeRect[1], holeRect[2], holeRect[3], dsi.holeFilletR, 4));
    holePoints.push(...Fillet2D(holeRect[2], holeRect[3], holeRect[0], dsi.holeFilletR, 4));
    holePoints.push(...Fillet2D(holeRect[3], holeRect[0], holeRect[1], dsi.holeFilletR, 4));
    result["mainPlate"] = vPlateGen([bl, br, tr, tl], point, dsi.webThickness, [0, 1, 2, 3], dsi.scallopRadius, urib2, lrib2, holePoints, [2, 3], [0, 1, 2, 3]);

    let holeCenter1 = { x: dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness };
    let hstiff1 = [{ x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 }, { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 },
    { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }, { x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }];
    // let hstiff2D1 = [{ x: dsi.holeCenterOffset - dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness },
    // { x: dsi.holeCenterOffset + dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness },
    // { x: dsi.holeCenterOffset + dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin },
    // { x: dsi.holeCenterOffset - dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin }]
    result["hstiff1"] = hPlateGenV2(hstiff1, point, holeCenter1, dsi.holeStiffThickness, 0, point.skew, 0, 0, ang90, ang90, false, [1, 2]);
    let hstiff2 = [{ x: - sign * (dsi.holeStiffhl / 2 + 100), y: dsi.webThickness / 2 }, { x: sign * dsi.holeStiffhl / 2, y: dsi.webThickness / 2 },
    { x: sign * dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }, { x: - sign * (dsi.holeStiffhl / 2 + 100), y: dsi.webThickness / 2 + dsi.holeStiffHeight }];
    let holeCenter2 = { x: dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin };
    // let hstiff2D2 = [{ x: dsi.holeCenterOffset - sign * (dsi.holeStiffhl / 2 + 100), y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin + dsi.holeStiffThickness },
    // { x: dsi.holeCenterOffset + sign * dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin + dsi.holeStiffThickness },
    // { x: dsi.holeCenterOffset + sign * dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin },
    // { x: dsi.holeCenterOffset - sign * (dsi.holeStiffhl / 2 + 100), y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin }]
    result["hstiff2"] = hPlateGenV2(hstiff2, point, holeCenter2, dsi.holeStiffThickness, 0, point.skew, 0, 0, ang90, ang90, true, [1, 2]);
    let holeCenter3 = { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - sign * (100 / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness), y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 };
    let vstiff1 = [{ x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 }, { x: dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 },
    { x: dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }, { x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }];
    let vStiffRad = Math.atan(sign * dsi.holeHeight / 100);
    // let vcos = Math.cos(- vStiffRad - Math.PI/2)
    // let vsin = Math.sin(- vStiffRad - Math.PI/2)
    // let x1 = - sign* (dsi.holeStiffThickness);
    // let x2 = 0;
    // let y1 = dsi.holeStiffvl / 2;
    // let y2 = - dsi.holeStiffvl / 2;
    // let vstiff2D1 = [{ x: dsi.holeCenterOffset - dsi.holeWidth / 2 - sign* ( 100/2 + dsi.holeStiffmargin) + x1 * vcos - y1 * vsin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + x1 * vsin + y1 * vcos },
    // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - sign * ( 100/2 + dsi.holeStiffmargin) + x1 * vcos - y2 * vsin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + x1 * vsin + y2 * vcos },
    // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - sign* ( 100/2 + dsi.holeStiffmargin) + x2 * vcos - y2 * vsin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + x2 * vsin + y2 * vcos },
    // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - sign* ( 100/2 + dsi.holeStiffmargin) + x2 * vcos - y1 * vsin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + x2 * vsin + y1 * vcos }]
    result["vstiff1"] = hPlateGenV2(vstiff1, point, holeCenter3, dsi.holeStiffThickness, 0, point.skew, 0, vStiffRad, ang90, ang90, true, [1, 2]);
    let holeCenter4 = { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + sign * (dsi.holeStiffmargin), y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 };
    // let vstiff2D2 = [{ x: dsi.holeCenterOffset + dsi.holeWidth / 2 + sign * (dsi.holeStiffmargin + dsi.holeStiffThickness), y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 },
    // { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + sign * (dsi.holeStiffmargin + dsi.holeStiffThickness), y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
    // { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + sign * (dsi.holeStiffmargin), y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
    // { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + sign * (dsi.holeStiffmargin), y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 }]
    result["vstiff2"] = hPlateGenV2(vstiff1, point, holeCenter4, dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2, ang90, ang90, true, null);


    for (let i in dsi.supportStiffLayout) {
      let supportStiffCenter1 = { x: dsi.supportStiffLayout[i], y: tl.y + gradient * (dsi.supportStiffLayout[i] - tl.x) };
      let supportStiff1 = [{ x: 0, y: dsi.webThickness / 2 }, { x: supportStiffCenter1.y - bl.y, y: dsi.webThickness / 2 },
      { x: supportStiffCenter1.y - bl.y, y: dsi.supportStiffWidth + dsi.webThickness / 2 }, { x: 0, y: dsi.supportStiffWidth + dsi.webThickness / 2 }];
      let supportStiff2 = [{ x: 0, y: -dsi.webThickness / 2 }, { x: supportStiffCenter1.y - bl.y, y: -dsi.webThickness / 2 },
      { x: supportStiffCenter1.y - bl.y, y: - dsi.supportStiffWidth - dsi.webThickness / 2 }, { x: 0, y: - dsi.supportStiffWidth - dsi.webThickness / 2 }];
      let supportStiff2D = [
        { x: dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2, y: tl.y + gradient * (dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2 - tl.x) },
        { x: dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2, y: bl.y },
        { x: dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2, y: bl.y },
        { x: dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2, y: tl.y + gradient * (dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2 - tl.x) }
      ];
      result["supportStiff1" + i] = hPlateGen(supportStiff1, ToGlobalPoint(point, supportStiffCenter1), dsi.supportStiffThickness, -dsi.supportStiffThickness / 2, point.skew, 0, Math.PI / 2, supportStiff2D, true);
      result["supportStiff2" + i] = hPlateGen(supportStiff2, ToGlobalPoint(point, supportStiffCenter1), dsi.supportStiffThickness, -dsi.supportStiffThickness / 2, point.skew, 0, Math.PI / 2, null, true);
    }

    let hStiffCenter = { x: 0, y: bl.y + dsi.hstiffHeight };
    // let h1 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.hstiffWidth - dsi.webThickness / 2 },
    //    { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: -dsi.holeStiffHeight - dsi.webThickness / 2 },
    // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: - dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.webThickness / 2 }];
    // result["h1"] = hPlateGen(h1, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);
    // let h11 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.hstiffWidth + dsi.webThickness / 2 }, { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.holeStiffHeight + dsi.webThickness / 2 },
    // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.webThickness / 2 }];
    // result["h11"] = hPlateGen(h11, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);

    let w0 = dsi.webThickness / 2;
    let w1 = dsi.holeStiffHeight + dsi.webThickness / 2;
    let w2 = dsi.hstiffWidth + dsi.webThickness / 2;
    let w3 = dsi.hstiffWidth2 + dsi.webThickness / 2;

    let hx = [[bl.x + lwCot * dsi.hstiffHeight, w2], [br.x + rwCot * dsi.hstiffHeight, w2]];
    if (dsi.hstiffHeight < dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 && dsi.hstiffHeight > dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2) {
      let dx = (dsi.hstiffHeight - dsi.holeBottomY) / dsi.holeHeight * 100;
      hx.push([dsi.holeCenterOffset - dsi.holeWidth / 2 - sign*(dsi.holeStiffmargin + dsi.holeStiffThickness + dx), w1],
        [dsi.holeCenterOffset + dsi.holeWidth / 2 + sign *(dsi.holeStiffmargin + dsi.holeStiffThickness), w1]);
    }
    for (let i in dsi.supportStiffLayout) {
      hx.push([dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2, w3]);
      hx.push([dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2, w3]);
    }
    hx.sort(function (a, b) { return a[0] - b[0] });
    let h2 = [];
    let h3 = [];
    for (let i = 0; i < hx.length / 2; i++) {
      h2.push([{ x: hx[i * 2][0], y: -(hx[i * 2][1] - 10) },
      { x: hx[i * 2][0] + 10, y: -hx[i * 2][1] },
      { x: hx[i * 2 + 1][0] - 10, y: -hx[i * 2 + 1][1] },
      { x: hx[i * 2 + 1][0], y: -(hx[i * 2 + 1][1] - 10) },
      { x: hx[i * 2 + 1][0], y: -(w0 + 10) },
      { x: hx[i * 2 + 1][0] - 10, y: -w0 },
      { x: hx[i * 2][0] + 10, y: -w0 },
      { x: hx[i * 2][0], y: -(w0 + 10) }]);
      h3.push([{ x: hx[i * 2][0], y: (hx[i * 2][1] - 10) },
      { x: hx[i * 2][0] + 10, y: hx[i * 2][1] },
      { x: hx[i * 2 + 1][0] - 10, y: hx[i * 2 + 1][1] },
      { x: hx[i * 2 + 1][0], y: (hx[i * 2 + 1][1] - 10) },
      { x: hx[i * 2 + 1][0], y: (w0 + 10) },
      { x: hx[i * 2 + 1][0] - 10, y: w0 },
      { x: hx[i * 2][0] + 10, y: w0 },
      { x: hx[i * 2][0], y: (w0 + 10) }]);
    }
    // let cpt = ToGlobalPoint(point, hStiffCenter)
    for (let i in h2) {
      // let h2D = [{ x: h2[i][0].x, y: hStiffCenter.y },
      // { x: h2[i][3].x, y: hStiffCenter.y },
      // { x: h2[i][3].x, y: hStiffCenter.y + dsi.hstiffThickness },
      // { x: h2[i][0].x, y: hStiffCenter.y + dsi.hstiffThickness }]
      result["h2" + i] = hPlateGenV2(h2[i], point, hStiffCenter, dsi.hstiffThickness, 0, point.skew, 0, 0, ang90, ang90, true, [2, 6]);
      result["h3" + i] = hPlateGenV2(h3[i], point, hStiffCenter, dsi.hstiffThickness, 0, point.skew, 0, 0, null, null, true, [2, 6]);
    }

    let gradRadian = Math.atan(gradient);
    // let gsec = 1 / Math.cos(gradRadian);
    // let gtan = Math.tan(gradRadian + Math.PI / 2)
    // topPlate
    if (uflange[0].length > 0) {
      // let topPlate2D = PlateRestPoint(uflange[0][1], uflange[1][1], gtan, gtan, topPlateThickness);
      let topPlate = [
        { x: uflange[0][1].x, y: topPlateWidth / 2 },
        { x: uflange[0][1].x, y: - topPlateWidth / 2 },
        { x: uflange[1][1].x, y: - topPlateWidth / 2 },
        { x: uflange[1][1].x, y: topPlateWidth / 2 },
      ];
      // let cp = ToGlobalPoint(point, { x: 0, y: tl.y - tl.x * gradient })
      let cp2 = { x: 0, y: tl.y - tl.x * gradient };
      const ang90 = Math.PI / 2;
      result['topPlate'] = hPlateGenV2(topPlate, point, cp2, topPlateThickness, 0, skew, 0, -gradRadian, ang90, ang90, true, [0, 1]);
    }
    return result
  }

  function HMvStiff1(webPoints, point, skew, uflangePoint, vSection, sectionDB) {

    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const gradient = (tr.y - tl.y) / (tr.x - tl.x);
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);

    let sideHeight = vSection.sideHeight;
    let sideThickness = vSection.sideThickness;
    let upperHeight = vSection.upperHeight;
    let bottomOffset = vSection.bottomOffset;
    let scallopRadius = vSection.scallopRadius;
    let sideScallopOffset = vSection.sideScallopOffset;
    //L100x100x10 section point, origin = (0,0)
    let spc = vSection.spc;
    let pts = PTS(vSection.tFrameName, false, 0, sectionDB);
    let leftplate = PlateRestPoint({ x: bl.x + lwCot * bottomOffset, y: bl.y + bottomOffset },tl,0,gradient, sideHeight );
    let leftPoints = [...scallop(leftplate[0], leftplate[1], leftplate[2], scallopRadius, 4), leftplate[2],
    ...scallop(leftplate[2], leftplate[3], leftplate[0], sideHeight - sideScallopOffset, 1), leftplate[0]];
    let rightplate = PlateRestPoint({ x: br.x + rwCot * bottomOffset, y: br.y + bottomOffset },tr,0,gradient, -sideHeight );
    let rightPoints = [...scallop(rightplate[0], rightplate[1], rightplate[2], scallopRadius, 4), rightplate[2],
    ...scallop(rightplate[2], rightplate[3], rightplate[0], sideHeight - sideScallopOffset, 1), rightplate[0]];
    let node1 = { x: tl.x - lwCot * upperHeight, y: tl.y - upperHeight };
    let node2 = { x: tr.x - rwCot * upperHeight, y: tr.y - upperHeight };
    let [upperframe1, upperframe2] = Kframe(node1, node2, spc, spc, pts);

    return {
      leftshape: vPlateGen(leftPoints, point, sideThickness, [],0,null,null,[],[4,5],[4,5,7,8]),
      rightShape: vPlateGen(rightPoints, point, sideThickness, [],0,null,null,[],[4,5],null),
      upperframe1: vFrameGen(upperframe1, point, pts[4], sideThickness/2,[1,2],null),
      upperframe2: vFrameGen(upperframe2, point, pts[5], sideThickness/2,[1,2],null),
    }
  }


  function hBracingFrame(point1, point2, webPoints, hBSection, sectionDB) {
    // let sideToplength = 700;
    // let sideTopwidth = 300;
    // let B = 2000;
    // let H = 2500;
    // let ULR = 1300;
    let result = {};
    const b1 = webPoints[0];
    const t1 = webPoints[1];
    const b2 = webPoints[2];
    const t2 = webPoints[3];

    const cot1 = (t1.x - b1.x) / (t1.y - b1.y);
    const cot2 = (t2.x - b2.x) / (t2.y - b2.y);

    let upperHeight = hBSection.upperHeight;
    let sideTopThickness = hBSection.sideTopThickness;
    let spc = hBSection.spc;
    let pts = PTS(hBSection.dFrameName, false, 1, sectionDB); //hBSection.pts

    let node1 = { x: t1.x - cot1 * (upperHeight + sideTopThickness), y: t1.y - (upperHeight + sideTopThickness) };
    let node2 = { x: t2.x - cot2 * (upperHeight + sideTopThickness), y: t2.y - (upperHeight + sideTopThickness) };
    let Brline = [
      ToGlobalPoint(point1, node1),
      ToGlobalPoint(point2, node2)
    ];
    let Vector = [Brline[1].x - Brline[0].x,
    Brline[1].y - Brline[0].y,
    Brline[1].z - Brline[0].z];
    let VectorLength = Math.sqrt(Vector[0] ** 2 + Vector[1] ** 2 + Vector[2] ** 2);
    let VectorLength2D = Math.sqrt(Vector[0] ** 2 + Vector[1] ** 2 );
    // let normalCos = Vector[1] / VectorLength;
    // let normalSin = - Vector[0] / VectorLength;
    let centerPoint = {
      x:(Brline[1].x + Brline[0].x)/2,
      y:(Brline[1].y + Brline[0].y)/2,
      z: (Brline[1].z + Brline[0].z)/2,
      normalCos : Vector[1] / VectorLength2D,
      normalSin : -Vector[0] / VectorLength2D,
      offset : point1.offset + (node1.x + node2.x)/2
    };
    let [frame1, frame2] = Kframe({x:0,y: -VectorLength/2}, {x:0,y: VectorLength/2}, spc, spc, pts);
    let z1 =  pts[4]>0? 0: pts[4];
    let z2 =  pts[5]>0? 0: pts[5];
    let rotX = Math.atan(Vector[2]/VectorLength2D);
    // let rotX2 = isleft? rotX : -rotX;
    result['frame1'] = hPlateGen(frame1, centerPoint, Math.abs(pts[4]),z1,90,rotX,0,null,true,null);
    result['frame2'] = hPlateGen(frame2, centerPoint, Math.abs(pts[5]),z2,90,rotX,0,null,true,null);
    return result 
  }

  function hBracingPlate(point, right, webPoints, hBSection) {
    // const topY = 270; //슬래브두께 + 헌치가 포함된 값이어야함.
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    const rwCot = (tr.x - br.x) / (tr.y - br.y);

    let upperHeight = hBSection.upperHeight;
    let sideTopThickness = hBSection.sideTopThickness;
    let sideToplength = hBSection.sideToplength;
    let sideTopwidth = hBSection.sideTopwidth;
    let scallopHeight = hBSection.scallopHeight;
    let scallopRadius = hBSection.scallopRadius;
    let scallopBottom = hBSection.scallopBottom;


    let position = {};
    let rotationY = -Math.atan((tr.y - tl.y) / (tr.x - tl.x));
    if (right) {
      position = { x: tr.x - rwCot * (upperHeight + sideTopThickness), y: tr.y - (upperHeight + sideTopThickness) };
    } else {
      position = { x: tl.x - lwCot * (upperHeight + sideTopThickness), y: tl.y - (upperHeight + sideTopThickness) };
    }
    let centerPoint = ToGlobalPoint(point, position);
    let rotation = (right) ? Math.PI / 2 : -Math.PI / 2;
    let cos = Math.cos(rotation);
    let sin = Math.sin(rotation);
    let curve = new global.THREE.ArcCurve(0, scallopHeight, scallopRadius, Math.PI, 0, true);
    let curvePoint = curve.getPoints(8);
    let ps = [];
    ps.push({ x: -sideToplength / 2, y: sideTopwidth });
    ps.push({ x: -sideToplength / 2, y: 0 });
    ps.push({ x: -scallopBottom, y: 0 });

    for (let i = 0; i < 9; i++) {
      ps.push({ x: curvePoint[i].x, y: curvePoint[i].y });
    }  ps.push({ x: scallopBottom, y: 0 });
    ps.push({ x: sideToplength / 2, y: 0 });
    ps.push({ x: sideToplength / 2, y: sideTopwidth });
    let plateShape = [];
    for (let i = 0; i < ps.length; i++) {
      plateShape.push({ x: ps[i].x * cos - ps[i].y * sin, y: ps[i].y * cos + ps[i].x * sin });
    }

    return hPlateGen(plateShape, centerPoint, sideTopThickness, 0, 90, 0, rotationY,null,true,null)
    // { point: point, plate: { points: plateShape, Thickness: sideTopThickness, z: position.y, rotationX: 0, rotationY: rotationY, hole: [] } }
  }

  // 판요소 생성시 기준점은 좌측하단을 기준으로 반드시 시계반대방향으로 회전할 것
  function vPlateGen(points, centerPoint, Thickness, scallopVertex, scallopR, urib, lrib, holePoints, top2D, side2D) {
    let skew = centerPoint.skew;

    const bl = points[0];
    const br = points[1];
    const tl = points[3];
    const tr = points[2];

    const gradient = (tr.y - tl.y) / (tr.x - tl.x);
    const gradient2 = (br.y - bl.y) / (br.x - bl.x);

    const cosec = 1 / Math.sin(skew * Math.PI / 180);
    const rotationY = (skew - 90) * Math.PI / 180;

    let topView = null;
    let sideView = null;

    if (top2D) {
      let pt1 = { x: points[top2D[0]].x * cosec, y: 0 };
      let pt2 = { x: points[top2D[1]].x * cosec, y: 0 };
      let gpt1 = ToGlobalPoint(centerPoint, pt1);
      let gpt2 = ToGlobalPoint(centerPoint, pt2);
      let th = Thickness / 2 * cosec;
      let dx = centerPoint.normalSin * th;
      let dy = centerPoint.normalCos * th;
      topView = [{ x: gpt1.x - dx, y: gpt1.y + dy },
      { x: gpt1.x + dx, y: gpt1.y - dy },
      { x: gpt2.x + dx, y: gpt2.y - dy },
      { x: gpt2.x - dx, y: gpt2.y + dy }];
    }

    if (side2D) {
      let bottomY = centerPoint.z + (points[side2D[0]].y - points[side2D[1]].y) / (points[side2D[0]].x - points[side2D[1]].x) * (- points[side2D[1]].x) + points[side2D[1]].y;
      let topY = centerPoint.z + (points[side2D[2]].y - points[side2D[3]].y) / (points[side2D[2]].x - points[side2D[3]].x) * (- points[side2D[3]].x) + points[side2D[3]].y;
      let X = centerPoint.girderStation;
      sideView = [
        { x: X + Thickness / 2, y: bottomY },
        { x: X - Thickness / 2, y: bottomY },
        { x: X - Thickness / 2, y: topY },
        { x: X + Thickness / 2, y: topY },
      ];
    }

    let mainPlate = [];
    points.forEach(pt => mainPlate.push({ x: pt.x * cosec, y: pt.y }));

    let upperPoints = [];
    if (urib) {
      for (let i = 0; i < urib.layout.length; i++) {
        upperPoints.push({ x: urib.layout[i] * cosec - urib.ribHoleD, y: tl.y + gradient * (urib.layout[i] - urib.ribHoleD - tl.x) });
        let curve = new global.THREE.ArcCurve(urib.layout[i] * cosec, tl.y + gradient * (urib.layout[i] - tl.x) - urib.height, urib.ribHoleR, Math.PI, 0, false);
        let dummyVectors = curve.getPoints(8);
        for (let i = 0; i < dummyVectors.length; i++) {
          upperPoints.push({ x: dummyVectors[i].x, y: dummyVectors[i].y });
        }
        upperPoints.push({ x: urib.layout[i] * cosec + urib.ribHoleD, y: tl.y + gradient * (urib.layout[i] + urib.ribHoleD - tl.x) });
      }
    }
    let lowerPoints = [];
    if (lrib) {
      if (lrib.type == 0) {
        for (let i = 0; i < lrib.layout.length; i++) {
          lowerPoints.push({ x: lrib.layout[i] * cosec - lrib.ribHoleD, y: bl.y + gradient2 * (lrib.layout[i] - lrib.ribHoleD - bl.x) });
          let curve = new global.THREE.ArcCurve(lrib.layout[i] * cosec, bl.y + gradient2 * (lrib.layout[i] - bl.x) + lrib.height, lrib.ribHoleR, Math.PI, 0, true);
          let dummyVectors = curve.getPoints(8);
          for (let i = 0; i < dummyVectors.length; i++) {
            lowerPoints.push({ x: dummyVectors[i].x, y: dummyVectors[i].y });
          }
          lowerPoints.push({ x: lrib.layout[i] * cosec + lrib.ribHoleD, y: bl.y + gradient2 * (lrib.layout[i] + lrib.ribHoleD - bl.x) });
        }
      } else if (lrib.type === 1) {
        for (let i = 0; i < lrib.layout.length; i++) {
          let dummyPoints = [];
          dummyPoints.push({ x: lrib.layout[i] * cosec - lrib.thickness / 2 - 1, y: bl.y + gradient2 * (lrib.layout[i] - lrib.thickness / 2 - 1 - bl.x) },
            { x: lrib.layout[i] * cosec - lrib.thickness / 2 - 1, y: bl.y + gradient2 * (lrib.layout[i] - bl.x) + lrib.height + 1 },
            { x: lrib.layout[i] * cosec + lrib.thickness / 2 + 1, y: bl.y + gradient2 * (lrib.layout[i] - bl.x) + lrib.height + 1 },
            { x: lrib.layout[i] * cosec + lrib.thickness / 2 + 1, y: bl.y + gradient2 * (lrib.layout[i] + lrib.thickness / 2 + 1 - bl.x) });
          lowerPoints.push(...scallop(bl, dummyPoints[0], dummyPoints[1], 10, 1));
          lowerPoints.push(dummyPoints[1], dummyPoints[2]);
          lowerPoints.push(...scallop(dummyPoints[2], dummyPoints[3], br, 10, 1));
        }
      }
    }
    let resultPoints = [];
    for (let i = 0; i < points.length; i++) {
      if (scallopVertex.includes(i)) {
        let former = i === 0 ? mainPlate.length - 1 : i - 1;
        let latter = i === mainPlate.length - 1 ? 0 : i + 1;
        resultPoints.push(...scallop(mainPlate[former], mainPlate[i], mainPlate[latter], scallopR, 4));
      } else {
        resultPoints.push(mainPlate[i]);
      }
      if (i === 0) {
        resultPoints.push(...lowerPoints);
      } else if (i === 2) {
        resultPoints.push(...upperPoints.reverse());
      }
    }

    let result = {
      points2D: resultPoints, points: resultPoints, Thickness: Thickness, z: - Thickness / 2,
      rotationX: Math.PI / 2, rotationY: rotationY, hole: holePoints, point: centerPoint, topView, sideView
    };

    return result
  }


  function vFrameGen(points, centerPoint, Thickness, z, top2D, side2D) {
    let skew = centerPoint.skew;
    const cosec = 1 / Math.sin(skew * Math.PI / 180);
    const rotationY = (skew - 90) * Math.PI / 180;
    let topView = null;
    let sideView = null;
    if (top2D) {
      let pt1 = { x: points[top2D[0]].x * cosec, y: 0 };
      let pt2 = { x: points[top2D[1]].x * cosec, y: 0 };
      let gpt1 = ToGlobalPoint(centerPoint, pt1);
      let gpt2 = ToGlobalPoint(centerPoint, pt2);
      // let th = Thickness * cosec;
      let dx1 = centerPoint.normalSin * (Thickness + z) * cosec;
      let dy1 = centerPoint.normalCos * (Thickness + z) * cosec;
      let dx2 = centerPoint.normalSin * (z) * cosec;
      let dy2 = centerPoint.normalCos * (z) * cosec;
      topView = [{ x: gpt1.x + dx1, y: gpt1.y - dy1 },
      { x: gpt1.x + dx2, y: gpt1.y - dy2 },
      { x: gpt2.x + dx2, y: gpt2.y - dy2 },
      { x: gpt2.x + dx1, y: gpt2.y - dy1 }];
    }

    if (side2D) {
      let bottomY = centerPoint.z + (points[side2D[0]].y - points[side2D[1]].y) / (points[side2D[0]].x - points[side2D[1]].x) * (- points[side2D[1]].x) + points[side2D[1]].y;
      let topY = centerPoint.z + (points[side2D[2]].y - points[side2D[3]].y) / (points[side2D[2]].x - points[side2D[3]].x) * (- points[side2D[3]].x) + points[side2D[3]].y;
      let X = centerPoint.girderStation;
      sideView = [
        { x: X - Thickness, y: bottomY },
        { x: X - Thickness - z, y: bottomY },
        { x: X - Thickness - z, y: topY },
        { x: X - Thickness, y: topY },
      ];
    }
    let result = {
      points2D: points, points: points, Thickness: Thickness, z: z,
      rotationX: Math.PI / 2, rotationY: rotationY, hole: [], point: centerPoint, topView, sideView
    };

    return result
  }


  // export function hPlateGen(points, centerPoint, Thickness, z, skew, rotationX, rotationY) {
  //   const cosec = 1 / Math.sin(skew * Math.PI / 180);
  //   const cot = - 1 / Math.tan(skew * Math.PI / 180);
  //   let resultPoints = [];
  //   points.forEach(pt => resultPoints.push({ x: pt.x, y: pt.x * cot + pt.y * cosec }))

  //   let result = { points: resultPoints, Thickness: Thickness, z: z, rotationX: rotationX, rotationY: rotationY, hole: [], point: centerPoint }
  //   return result
  // }

  function hPlateGen(points, centerPoint, Thickness, z, skew, rotationX, rotationY, points2D, top2D, side2D) {
    const cosec = 1 / Math.sin(skew * Math.PI / 180);
    const cot = - 1 / Math.tan(skew * Math.PI / 180);
    let cos = Math.cos(rotationY);
    let cosx = Math.cos(rotationX);
    let resultPoints = [];
    let topView = null;
    let sideView = null;

    points.forEach(pt => resultPoints.push({ x: pt.x, y: pt.x * cot + pt.y * cosec }));
    if (top2D) {
      topView = [];
      if (rotationY < Math.PI / 2 && rotationY > -Math.PI / 2) {
        resultPoints.forEach(function (pt) {
          let gpt = ToGlobalPoint(centerPoint, { x: pt.x * cos, y: 0 });
          let th = pt.y * cosx;
          let dx = centerPoint.normalSin * th;
          let dy = centerPoint.normalCos * th;
          topView.push({ x: gpt.x - dx, y: gpt.y + dy });
        });
      } else if (rotationY === Math.PI / 2 || rotationY === - Math.PI / 2) {
        let gpt = ToGlobalPoint(centerPoint, { x: resultPoints[0].x * cos, y: 0 });
        for (let i = 0; i < 4; i++) {
          let sign = rotationY > 0 ? 1 : -1;
          let th = i < 2 ? resultPoints[0].y * cosx : resultPoints[3].y * cosx;
          let dx = centerPoint.normalSin * th;
          let dy = centerPoint.normalCos * th;
          let dx2 = 0 < i && i < 3 ? sign * centerPoint.normalCos * z : sign * centerPoint.normalCos * (z + Thickness);
          let dy2 = 0 < i && i < 3 ? sign * centerPoint.normalSin * z : sign * centerPoint.normalSin * (z + Thickness);
          topView.push({ x: gpt.x - dx + dx2, y: gpt.y + dy + dy2 });
        }
      }
      // console.log("check", topView)
    }
    if (side2D || side2D === 0) {
      let cos = Math.cos(rotationX);
      let sin = Math.sin(rotationX);
      sideView = [];
      if (rotationY < Math.PI / 4 && rotationY > -Math.PI / 4) {
        let x1 = points[side2D[0]].y;
        let x2 = points[side2D[1]].y;
        let X = centerPoint.girderStation;
        let Y = centerPoint.z;
        let pts = [{ x: X + x1 * cos - z * sin, y: Y + x1 * sin + z * cos },
        { x: X + x2 * cos - z * sin, y: Y + x2 * sin + z * cos },
        { x: X + x2 * cos - (Thickness + z) * sin, y: Y + x2 * sin + (Thickness + z) * cos },
        { x: X + x1 * cos - (Thickness + z) * sin, y: Y + x1 * sin + (Thickness + z) * cos }];
        pts.forEach(pt => sideView.push(pt));

      } else { //if (rotationY === Math.PI / 2 || rotationY === - Math.PI / 2) {
        // let sign = rotationY > 0 ? 1 : -1
        let dz = 0;
        if (typeof side2D === "number") { dz = side2D; }
        let X = centerPoint.girderStation;
        let Y = centerPoint.z + dz;
        points.forEach(pt => sideView.push({ x: X + pt.y, y: Y + pt.x * Math.sin(rotationY) }));
      }
    }

    let result = { points2D: points2D, points: resultPoints, Thickness: Thickness, z: z, rotationX: rotationX, rotationY: rotationY, hole: [], point: centerPoint, topView, sideView };
    return result
  }

  function hPlateGenV2(points, Point, relativeCP, Thickness, z, skew, rotationX, rotationY, th1, th2, top2D, side2D) {
    const centerPoint = ToGlobalPoint(Point, relativeCP);
    const cosec = 1 / Math.sin(skew * Math.PI / 180);
    const cot = - 1 / Math.tan(skew * Math.PI / 180);
    let cos = Math.cos(rotationY);
    let cosx = Math.cos(rotationX);
    let resultPoints = [];
    let topView = null;
    let sideView = null;

    points.forEach(pt => resultPoints.push({ x: pt.x, y: pt.x * cot + pt.y * cosec }));
    if (top2D) {
      let yList = [];
      resultPoints.forEach(elem => yList.push(elem.y));
      topView = [];
      if (rotationY < Math.PI / 2 && rotationY > -Math.PI / 2) {
        resultPoints.forEach(function (pt) {
          let gpt = ToGlobalPoint(centerPoint, { x: pt.x * cos, y: 0 });
          let th = pt.y * cosx;
          let dx = centerPoint.normalSin * th;
          let dy = centerPoint.normalCos * th;
          topView.push({ x: gpt.x - dx, y: gpt.y + dy });
        });
      } else if (rotationY === Math.PI / 2 || rotationY === - Math.PI / 2) {
        let gpt = ToGlobalPoint(centerPoint, { x: resultPoints[0].x * cos, y: 0 });
        for (let i = 0; i < 4; i++) {
          let sign = rotationY > 0 ? 1 : -1;
          let th = i < 2 ? Math.min(...yList) * cosx : Math.max(...yList) * cosx;
          let dx = centerPoint.normalSin * th;
          let dy = centerPoint.normalCos * th;
          let dx2 = 0 < i && i < 3 ? sign * centerPoint.normalCos * z : sign * centerPoint.normalCos * (z + Thickness);
          let dy2 = 0 < i && i < 3 ? sign * centerPoint.normalSin * z : sign * centerPoint.normalSin * (z + Thickness);
          topView.push({ x: gpt.x - dx + dx2, y: gpt.y + dy + dy2 });
        }
      }
      // console.log("check", topView)
    }
    if (side2D || side2D === 0) {
      let cos = Math.cos(rotationX);
      let sin = Math.sin(rotationX);
      sideView = [];
      if (rotationY < Math.PI / 4 && rotationY > -Math.PI / 4) {
        let x1 = points[side2D[0]].y;
        let x2 = points[side2D[1]].y;
        let X = centerPoint.girderStation;
        let Y = centerPoint.z;
        let pts = [{ x: X + x1 * cos - z * sin, y: Y + x1 * sin + z * cos },
        { x: X + x2 * cos - z * sin, y: Y + x2 * sin + z * cos },
        { x: X + x2 * cos - (Thickness + z) * sin, y: Y + x2 * sin + (Thickness + z) * cos },
        { x: X + x1 * cos - (Thickness + z) * sin, y: Y + x1 * sin + (Thickness + z) * cos }];
        pts.forEach(pt => sideView.push(pt));

      } else { //if (rotationY === Math.PI / 2 || rotationY === - Math.PI / 2) {
        // let sign = rotationY > 0 ? 1 : -1
        let dz = 0;
        if (typeof side2D === "number") { dz = side2D; }
        let X = centerPoint.girderStation;
        let Y = centerPoint.z + dz;
        points.forEach(pt => sideView.push({ x: X + pt.y, y: Y + pt.x * Math.sin(rotationY) }));
      }
    }
    let points2D = null;
    if (th1 && th2) {
      let xList = [];
      points.forEach(elem => xList.push(elem.x));
      points2D = hPlateSide2D(Math.min(...xList), Math.max(...xList), Thickness, z, relativeCP, rotationY, th1, th2);
    } 
    let result = { points2D: points2D, points: resultPoints, Thickness: Thickness, z: z, rotationX: rotationX, rotationY: rotationY, hole: [], point: centerPoint, topView, sideView };
    return result
  }

  function hPlateSide2D(x1, x2, t, z, cp, rot, th1, th2) {
    let result = [];
    // x1, x2, cp에 대한 rot 회전이전의 상대좌표 x값
    // t 판의 두께, th1, th2, x1,x2 꼭지점의 각(x축기준 시계반대방향각), rot는 시계방향각으로 부호를 반대로 적용
    // 판의 두께는 항상 양수의 값을 가져야 함
    // 글로벌 좌표기준 z방향  offset 거리
    let cos = Math.cos(-rot);
    let sin = Math.sin(-rot);
    let pts = [{ x: x1, y: z }, { x: x2, y: z },
    { x: x2 + t / Math.tan(th2), y: t + z }, { x: x1 + t / Math.tan(th1), y: t + z }];
    pts.forEach(pt => result.push({ x: cp.x + pt.x * cos - pt.y * sin, y: cp.y + pt.x * sin + pt.y * cos }));
    return result
  }

  // import { LiteGraph, meshArr } from "global";


  function DiaDict(){
      this.addInput("gridPoint","gridPoint");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("diaphragmLayout","arr");
    this.addInput("diaphragmSectionList","diaphragmSectionList");
    this.addInput("sectionDB","sectionDB");
    this.addOutput("diaDict","diaDict");
  }

  DiaDict.prototype.onExecute = function() {
      const gridPoint = this.getInputData(0);
      const sectionPointDict = this.getInputData(1);
    const diaphragmLayout = this.getInputData(2);
    const diaphragmSectionList = this.getInputData(3);

    const result = DiaShapeDict(gridPoint, sectionPointDict,diaphragmLayout,diaphragmSectionList, this.getInputData(4));
    this.setOutputData(0, result);
  };

  function VstiffDict(){
      this.addInput("gridPoint","gridPoint");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("vStiffLayout","arr");
    this.addInput("vStiffSectionList","vStiffSectionList");
    this.addInput("sectionDB","sectionDB");
    this.addOutput("diaDict","diaDict");
  }

  VstiffDict.prototype.onExecute = function() {
      const gridPoint = this.getInputData(0);
      const sectionPointDict = this.getInputData(1);
    const vStiffLayout = this.getInputData(2);
    const vStiffSectionList = this.getInputData(3);
    const result = VstiffShapeDict(gridPoint, sectionPointDict,vStiffLayout,vStiffSectionList, this.getInputData(4));
    this.setOutputData(0, result);
  };


  function HBracing(){
      this.addInput("gridPoint","gridPoint");
      this.addInput("sectionPointDict","sectionPointDict");
      this.addInput("hBracingLayout","arr");
      this.addInput("hBracingSectionList","hBracingSectionList");
      this.addInput("sectionDB","sectionDB");
      this.addOutput("diaDict","diaDict");
    }
    
    HBracing.prototype.onExecute = function() {
      const gridPoint = this.getInputData(0);
      const sectionPointDict = this.getInputData(1);
      const hBracingLayout = this.getInputData(2);
      const hBracingSectionList = this.getInputData(3);
      const result = HBracingDict(gridPoint, sectionPointDict,hBracingLayout,hBracingSectionList,this.getInputData(4));
      this.setOutputData(0, result);
    };

    function JackupDict(){
      this.addInput("gridPoint","gridPoint");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("jackupData","arr");
    this.addOutput("diaDict","diaDict");
  }

  JackupDict.prototype.onExecute = function() {
      const gridPoint = this.getInputData(0);
      const sectionPointDict = this.getInputData(1);
    const jackupData = this.getInputData(2);
    const result = JackupStiffDict(gridPoint, sectionPointDict, jackupData);
    this.setOutputData(0, result);
  };

  function HstiffDict(){
    this.addInput("gridPoint","gridPoint");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("hstiffLayout","arr");
    this.addOutput("diaDict","diaDict");
  }

  HstiffDict.prototype.onExecute = function(){
    const result = HorStiffDict(this.getInputData(0), this.getInputData(1), this.getInputData(2));
    this.setOutputData(0, result);
  };

  function XbeamDict(
    nameToPointDict,
    sectionPointDict,
    xbeamLayout,
    xbeamSectionList,
    sectionDB
  ) {
    const iNode = 0;
    const jNode = 1;
    const section = 2;

    let xbeamSectionDict = {};
    let xbeamData = [];
    for (let i = 0; i < xbeamLayout.length; i++) {
      let iNodekey = xbeamLayout[i][iNode];
      let jNodekey = xbeamLayout[i][jNode];
      let xbeamSection = xbeamSectionList[xbeamLayout[i][section]];
      let iSectionPoint = sectionPointDict[iNodekey].forward;
      let jSectionPoint = sectionPointDict[jNodekey].forward;
      let iPoint = nameToPointDict[iNodekey];
      let jPoint = nameToPointDict[jNodekey];
      let xbData = [];
      let xbSection = [];
      // let cbkey = 'CB' + iNodekey + 'To' + jNodekey
      if (xbeamLayout[i][section] == "xbeamI") {
        let xbeam = XbeamI0(
          iPoint,
          jPoint,
          iSectionPoint,
          jSectionPoint,
          xbeamSection
        );
        xbeamSectionDict[iNodekey + jNodekey] = xbeam.result;
        xbData = xbeam.data;
        xbSection = xbeam.section;
      } else if (xbeamLayout[i][section] == "xbeamK") {
        let xbeam = XbeamK0(
          iPoint,
          jPoint,
          iSectionPoint,
          jSectionPoint,
          xbeamSection,
          sectionDB
        );
        xbeamSectionDict[iNodekey + jNodekey] = xbeam.result;
        xbData = xbeam.data;
        xbSection = xbeam.section;
      } else if (xbeamLayout[i][section] == "DYXbeam1") {
        let xbeam = DYXbeam1(
          iPoint,
          jPoint,
          iSectionPoint,
          jSectionPoint);
        xbeamSectionDict[iNodekey + jNodekey] = xbeam.result;
        xbData = xbeam.data;
        xbSection = xbeam.section;
      } else if (xbeamLayout[i][section] == "DYXbeam2") {
        let xbeam = DYXbeam2(
          iPoint,
          jPoint,
          iSectionPoint,
          jSectionPoint);
        xbeamSectionDict[iNodekey + jNodekey] = xbeam.result;
        xbData = xbeam.data;
        xbSection = xbeam.section;
      } else if (xbeamLayout[i][section] == "DYXbeam3") {
        let xbeam = DYXbeam3(
          iPoint,
          jPoint,
          iSectionPoint,
          jSectionPoint);
        xbeamSectionDict[iNodekey + jNodekey] = xbeam.result;
        xbData = xbeam.data;
        xbSection = xbeam.section;
      } else if (xbeamLayout[i][section] == "DYXbeam4") {
        let xbeam = DYXbeam4(
          iPoint,
          jPoint,
          iSectionPoint,
          jSectionPoint);
        xbeamSectionDict[iNodekey + jNodekey] = xbeam.result;
        xbData = xbeam.data;
        xbSection = xbeam.section;
      }


      // xbeamSectionDict[iNodekey] = XbeamSection(iPoint,jPoint,iSectionPoint,jSectionPoint,xbeamSection)
      // xbeamPointDict[cbkey] = XbeamPoint(iPoint,jPoint,iSectionPoint,jSectionPoint,xbeamLayout)
      //xbeamData = [{inode:"key1", jnode:"key2",key : "X01", isKframe : true, data:[]}];
      let key = i < 10 ? "X0" + i : "X" + i;
      let isKframe = xbeamLayout[i][section] == "xbeamK" ? true : false;
      xbeamData.push({
        inode: iNodekey, jnode: jNodekey, key: key, isKframe: isKframe, data: xbData, section: xbSection
      });
    }

    return { xbeamSectionDict, xbeamData };
  }

  function DYXbeam4(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
    let xs = {
      bracketLength: 541,
      bracketWidth: 450,
      bracketFilletR: 100,
      lflangeHeight: 300,
      webHeight: 576,
      webThickness: 12,
      flangeWidth: 250,
      flangeThickness: 12,
      stiffThickness: 12,
      stiffWidth: 150,
      scallopRadius: 25,
      webJointThickness: 10,
      webJointWidth: 330,
      webJointHeight: 440,
      flangeJointThickness: 10,
      flangeJointLength: 480,
      flangeJointWidth: 80,
    };
    let wBolt = {
      P: 90,
      G: 75,
      pNum: 5,
      gNum: 2,
      size: 37,
      dia: 22,
      t: 14,
    };
    let fBolt = {
      P: 170,
      G: 75,
      pNum: 2,
      gNum: 3,
      size: 37,
      dia: 22,
      t: 14,
    };

    let result = {};
    let tlength = Math.sqrt((iPoint.x - jPoint.x) ** 2 + (iPoint.y - jPoint.y) ** 2);
    let vec = { x: (jPoint.x - iPoint.x) / tlength, y: (jPoint.y - iPoint.y) / tlength };
    let dOffset = (jPoint.offset - iPoint.offset) / 2;
    let dz = (jPoint.z - iPoint.z) / 2;

    let centerPoint = {
      x: (iPoint.x + jPoint.x) / 2,
      y: (iPoint.y + jPoint.y) / 2,
      z: (iPoint.z + jPoint.z) / 2,
      normalCos: iPoint.normalCos,
      normalSin: iPoint.normalSin,
      offset: (iPoint.offset + jPoint.offset) / 2,
    };
    let cw = (centerPoint.normalCos * vec.y - centerPoint.normalSin * vec.x) > 0 ? 1 : -1; // 반시계방향의 경우 1
    centerPoint.skew = 90 + cw * Math.acos(centerPoint.normalCos * vec.x + centerPoint.normalSin * vec.y) * 180 / Math.PI;

    //폐합시를 고려하여 예외처리 필요
    let ufl, ufr;
    if (iSectionPoint.uflange[2].length > 0) {
      ufl = { x: iSectionPoint.uflange[2][1].x - dOffset, y: iSectionPoint.uflange[2][1].y - dz };
    } else {
      ufl = { x: iSectionPoint.uflange[1][0].x - dOffset, y: iSectionPoint.uflange[1][0].y - dz };
    }
    if (jSectionPoint.uflange[2].length > 0) {
      ufr = { x: jSectionPoint.uflange[2][0].x + dOffset, y: jSectionPoint.uflange[2][0].y + dz };
    } else {
      ufr = { x: jSectionPoint.uflange[0][0].x + dOffset, y: jSectionPoint.uflange[0][0].y + dz };
    }

    let tl = { x: iSectionPoint.web[1][2].x - dOffset, y: iSectionPoint.web[1][2].y - dz };
    let tr = { x: jSectionPoint.web[0][2].x + dOffset, y: jSectionPoint.web[0][2].y + dz };
    let bl = { x: iSectionPoint.web[1][3].x - dOffset, y: iSectionPoint.web[1][3].y - dz };
    let br = { x: jSectionPoint.web[0][3].x + dOffset, y: jSectionPoint.web[0][3].y + dz };

    let uGradient = (ufr.y - ufl.y) / (ufr.x - ufl.x);
    let lGradient = (br.y - bl.y) / (br.x - bl.x);
    let lRad = -Math.atan(lGradient);

    let lwebPlate = PlateRestPoint({ x: bl.x, y: bl.y + xs.lflangeHeight }, { x: bl.x, y: bl.y + xs.webHeight + xs.lflangeHeight }, lGradient, lGradient, xs.bracketLength);
    result["lweb"] = vPlateGen(lwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3], [0, 3, 2, 1]);
    let lstiff = PlateRestPoint({ x: bl.x, y: bl.y + xs.lflangeHeight - xs.flangeThickness }, bl, lGradient, 0, xs.stiffWidth);
    let lstiff2 = PlateRestPoint({ x: bl.x, y: bl.y + xs.lflangeHeight + xs.webHeight + xs.flangeThickness }, tl, lGradient, uGradient, xs.stiffWidth);
    result["lstiff"] = vPlateGen(lstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);
    result["lstiff2"] = vPlateGen(lstiff2, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);

    let rwebPlate = PlateRestPoint({ x: br.x, y: br.y + xs.lflangeHeight }, { x: br.x, y: br.y + xs.webHeight + xs.lflangeHeight }, lGradient, lGradient, -xs.bracketLength);
    result["rweb"] = vPlateGen(rwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3], [0, 3, 2, 1]);
    let rstiff = PlateRestPoint({ x: br.x, y: br.y + xs.lflangeHeight - xs.flangeThickness }, br, lGradient, 0, -xs.stiffWidth);
    let rstiff2 = PlateRestPoint({ x: br.x, y: br.y + xs.lflangeHeight + xs.webHeight + xs.flangeThickness }, tr, lGradient, uGradient, -xs.stiffWidth);
    result["rstiff"] = vPlateGen(rstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);
    result["rstiff2"] = vPlateGen(rstiff2, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);


    let bracketPoint = [lwebPlate[0], rwebPlate[0], lwebPlate[1], rwebPlate[1]];
    for (let i = 0; i < 4; i++) {
      let sign = i % 2 === 0 ? 1 : -1;
      let grad = lRad;
      let bracketLength = xs.bracketLength;
      let z = i < 2 ? - xs.flangeThickness : 0;
      let thickness = i < 2 ? -xs.flangeThickness : xs.flangeThickness;
      let lowerbracket1 = [{ x: 0, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.flangeWidth / 2 }, { x: sign * bracketLength, y: xs.flangeWidth / 2 },
      { x: sign * bracketLength, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.bracketWidth / 2 }, { x: 0, y: -xs.bracketWidth / 2 }];
      let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], xs.bracketFilletR, 4),
      lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], xs.bracketFilletR, 4),
      lowerbracket1[6], lowerbracket1[7]];
      let top2D = i < 2 ? false : true;
      result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, ToGlobalPoint(centerPoint, bracketPoint[i]), xs.flangeThickness, z, centerPoint.skew, 0, grad,
        hPlateSide2D(0, sign * bracketLength / Math.cos(grad), thickness, 0, bracketPoint[i], grad, Math.PI / 2 + grad, Math.PI / 2 + grad), top2D, false);
    }
    let webPlate = [lwebPlate[3], rwebPlate[3], rwebPlate[2], lwebPlate[2]];
    result["web"] = vPlateGen(webPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [2, 3], [0, 1, 2, 3]);
    let uPoint = ToGlobalPoint(centerPoint, lwebPlate[2]);
    let l = Math.sqrt((lwebPlate[3].x - rwebPlate[3].x) ** 2 + (lwebPlate[3].y - rwebPlate[3].y) ** 2);
    let uflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: l, y: -xs.flangeWidth / 2 }, { x: l, y: xs.flangeWidth / 2 }];
    result["uflange"] = hPlateGen(uflangePlate, uPoint, xs.flangeThickness, 0, uPoint.skew, 0, lRad,
      hPlateSide2D(0, l, xs.flangeThickness, 0, lwebPlate[2], lRad, Math.PI / 2 + lRad, Math.PI / 2 + lRad), true, [0, 1]);
    let lPoint = ToGlobalPoint(centerPoint, lwebPlate[3]);
    let ll = Math.sqrt((lwebPlate[2].x - rwebPlate[2].x) ** 2 + (lwebPlate[2].y - rwebPlate[2].y) ** 2);
    let lflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: ll, y: -xs.flangeWidth / 2 }, { x: ll, y: xs.flangeWidth / 2 }];
    result["lflange"] = hPlateGen(lflangePlate, lPoint, xs.flangeThickness, -xs.flangeThickness, uPoint.skew, 0, lRad,
      hPlateSide2D(0, ll, -xs.flangeThickness, 0, lwebPlate[3], lRad, Math.PI / 2 + lRad, Math.PI / 2 + lRad), false, [0, 1]);
    let joint = IbeamJoint(webPlate, centerPoint, xs, wBolt, fBolt);
    for (let i in joint) { result[i] = joint[i]; }
    let data = [ToGlobalPoint(centerPoint, { x: (lwebPlate[0].x + lwebPlate[1].x) / 2, y: (lwebPlate[0].y + lwebPlate[1].y) / 2, z: (lwebPlate[0].z + lwebPlate[1].z) / 2 }),
    ToGlobalPoint(centerPoint, { x: (rwebPlate[0].x + rwebPlate[1].x) / 2, y: (rwebPlate[0].y + rwebPlate[1].y) / 2, z: (rwebPlate[0].z + rwebPlate[1].z) / 2 })];
    let section = [xs.flangeWidth, xs.flangeThickness, xs.flangeWidth, xs.flangeThickness, xs.webHeight, xs.webThickness];
    return { result, data, section }
  }

  function DYXbeam3(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
    let xs = {
      bracketLength: 554,
      bracketWidth: 450,
      bracketFilletR: 100,
      webHeight: 576,
      webThickness: 12,
      flangeWidth: 250,
      flangeThickness: 12,
      stiffThickness: 12,
      stiffWidth: 150,
      stiffWidth2: 300,
      stiffFilletR: 200,
      scallopRadius: 25,
      webJointThickness: 10,
      webJointWidth: 330,
      webJointHeight: 440,
      flangeJointThickness: 10,
      flangeJointLength: 480,
      flangeJointWidth: 80,
    };
    let wBolt = {
      P: 90,
      G: 75,
      pNum: 5,
      gNum: 2,
      size: 37,
      dia: 22,
      t: 14,
    };
    let fBolt = {
      P: 170,
      G: 75,
      pNum: 2,
      gNum: 3,
      size: 37,
      dia: 22,
      t: 14,
    };

    let result = {};
    let tlength = Math.sqrt((iPoint.x - jPoint.x) ** 2 + (iPoint.y - jPoint.y) ** 2);
    let vec = { x: (jPoint.x - iPoint.x) / tlength, y: (jPoint.y - iPoint.y) / tlength };
    let dOffset = (jPoint.offset - iPoint.offset) / 2;
    let dz = (jPoint.z - iPoint.z) / 2;

    let centerPoint = {
      x: (iPoint.x + jPoint.x) / 2,
      y: (iPoint.y + jPoint.y) / 2,
      z: (iPoint.z + jPoint.z) / 2,
      normalCos: iPoint.normalCos,
      normalSin: iPoint.normalSin,
      offset: (iPoint.offset + jPoint.offset) / 2
    };
    let cw = (centerPoint.normalCos * vec.y - centerPoint.normalSin * vec.x) > 0 ? 1 : -1; // 반시계방향의 경우 1
    centerPoint.skew = 90 + cw * Math.acos(centerPoint.normalCos * vec.x + centerPoint.normalSin * vec.y) * 180 / Math.PI;

    //폐합시를 고려하여 예외처리 필요
    let ufl, ufr, lfl, lfr;
    if (iSectionPoint.uflange[2].length > 0) {
      ufl = { x: iSectionPoint.uflange[2][1].x - dOffset, y: iSectionPoint.uflange[2][1].y - dz };
    } else {
      ufl = { x: iSectionPoint.uflange[1][0].x - dOffset, y: iSectionPoint.uflange[1][0].y - dz };
    }
    if (jSectionPoint.uflange[2].length > 0) {
      ufr = { x: jSectionPoint.uflange[2][0].x + dOffset, y: jSectionPoint.uflange[2][0].y + dz };
    } else {
      ufr = { x: jSectionPoint.uflange[0][0].x + dOffset, y: jSectionPoint.uflange[0][0].y + dz };
    }
    if (iSectionPoint.lflange[2].length > 0) {
      lfl = { x: iSectionPoint.lflange[2][1].x - dOffset, y: iSectionPoint.lflange[2][1].y - dz };
    } else {
      lfl = { x: iSectionPoint.lflange[1][0].x - dOffset, y: iSectionPoint.lflange[1][0].y - dz };
    }
    if (jSectionPoint.lflange[2].length > 0) {
      lfr = { x: jSectionPoint.lflange[2][0].x + dOffset, y: jSectionPoint.lflange[2][0].y + dz };
    } else {
      lfr = { x: jSectionPoint.lflange[0][0].x + dOffset, y: jSectionPoint.lflange[0][0].y + dz };
    }

    let tl = { x: iSectionPoint.web[1][2].x - dOffset, y: iSectionPoint.web[1][2].y - dz };
    let tr = { x: jSectionPoint.web[0][2].x + dOffset, y: jSectionPoint.web[0][2].y + dz };
    let bl = { x: iSectionPoint.web[1][3].x - dOffset, y: iSectionPoint.web[1][3].y - dz };
    let br = { x: jSectionPoint.web[0][3].x + dOffset, y: jSectionPoint.web[0][3].y + dz };

    let tGradient = (tr.y - tl.y) / (tr.x - tl.x);
    let uGradient = (br.y - bl.y) / (br.x - bl.x);
    let lGradient = (lfr.y - lfl.y) / (lfr.x - lfl.x);
    let uRad = -Math.atan(uGradient);
    let lRad = -Math.atan(lGradient);

    let lwebPlate = [{ x: bl.x, y: bl.y + xs.webHeight }, bl, lfl, { x: bl.x + xs.bracketLength, y: lfl.y + lGradient * (xs.bracketLength - (lfl.x - bl.x)) },
    { x: bl.x + xs.bracketLength, y: bl.y + xs.webHeight + uGradient * xs.bracketLength }];
    result["lweb"] = vPlateGen(lwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3], null);
    let lstiffPoint = [tl, { x: bl.x, y: bl.y + xs.webHeight + xs.flangeThickness }, { x: bl.x + xs.stiffWidth2, y: bl.y + xs.webHeight + xs.flangeThickness + uGradient * xs.stiffWidth2 },
      { x: bl.x + xs.stiffWidth2, y: bl.y + xs.webHeight + xs.flangeThickness + uGradient * xs.stiffWidth2 + 50 },
      { x: bl.x + xs.stiffWidth, y: bl.y + xs.webHeight + xs.flangeThickness + uGradient * xs.stiffWidth2 + (xs.stiffWidth2 - xs.stiffWidth) + 50 },
      { x: tl.x + xs.stiffWidth, y: tl.y + tGradient * xs.stiffWidth }];
    let lstiff = [];
    lstiff.push(...scallop(lstiffPoint[5], lstiffPoint[0], lstiffPoint[1], xs.scallopRadius, 4));
    lstiff.push(...scallop(lstiffPoint[0], lstiffPoint[1], lstiffPoint[2], xs.scallopRadius, 4));
    lstiff.push(lstiffPoint[2], lstiffPoint[3]);
    lstiff.push(...Fillet2D(lstiffPoint[3], lstiffPoint[4], lstiffPoint[5], xs.stiffFilletR, 4));
    lstiff.push(lstiffPoint[5]);
    result["lstiff"] = vPlateGen(lstiff, centerPoint, xs.stiffThickness, [], 0, null, null, []);

    let rwebPlate = [{ x: br.x, y: br.y + xs.webHeight }, br, lfr, { x: br.x - xs.bracketLength, y: lfr.y - lGradient * (xs.bracketLength - (br.x - lfr.x)) },
    { x: br.x - xs.bracketLength, y: br.y + xs.webHeight - uGradient * xs.bracketLength }];
    result["rweb"] = vPlateGen(rwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3], null);
    let rstiffPoint = [tr, { x: br.x, y: br.y + xs.webHeight + xs.flangeThickness }, { x: br.x - xs.stiffWidth2, y: br.y + xs.webHeight + xs.flangeThickness - uGradient * xs.stiffWidth2 },
      { x: br.x - xs.stiffWidth2, y: br.y + xs.webHeight + xs.flangeThickness - uGradient * xs.stiffWidth2 + 50 },
      { x: br.x - xs.stiffWidth, y: br.y + xs.webHeight + xs.flangeThickness - uGradient * xs.stiffWidth2 + (xs.stiffWidth2 - xs.stiffWidth) + 50 },
      { x: tr.x - xs.stiffWidth, y: tr.y - tGradient * xs.stiffWidth }];
    let rstiff = [];
    rstiff.push(...scallop(rstiffPoint[5], rstiffPoint[0], rstiffPoint[1], xs.scallopRadius, 4));
    rstiff.push(...scallop(rstiffPoint[0], rstiffPoint[1], rstiffPoint[2], xs.scallopRadius, 4));
    rstiff.push(rstiffPoint[2], rstiffPoint[3]);
    rstiff.push(...Fillet2D(rstiffPoint[3], rstiffPoint[4], rstiffPoint[5], xs.stiffFilletR, 4));
    rstiff.push(rstiffPoint[5]);
    result["rstiff"] = vPlateGen(rstiff, centerPoint, xs.stiffThickness, [], 0, null, null, []);

    let bracketPoint = [lwebPlate[0], rwebPlate[0], lfl, lfr];
    for (let i = 0; i < 4; i++) {
      let sign = i % 2 === 0 ? 1 : -1;
      let grad = i < 2 ? uRad : lRad;
      let z = i < 2 ? 0 : -xs.flangeThickness;
      let thickness = i < 2 ? xs.flangeThickness : - xs.flangeThickness;
      let bracketLength = i < 2 ? xs.bracketLength : i === 2 ? xs.bracketLength - (ufl.x - tl.x) : xs.bracketLength - (tr.x - ufr.x);
      let lowerbracket1 = [{ x: 0, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.flangeWidth / 2 }, { x: sign * bracketLength, y: xs.flangeWidth / 2 },
      { x: sign * bracketLength, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.bracketWidth / 2 }, { x: 0, y: -xs.bracketWidth / 2 }];
      let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], xs.bracketFilletR, 4),
      lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], xs.bracketFilletR, 4),
      lowerbracket1[6], lowerbracket1[7]];
      let top2D = i < 2 ? true : false;
      result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, ToGlobalPoint(centerPoint, bracketPoint[i]), xs.flangeThickness, z, centerPoint.skew, 0, grad,
        hPlateSide2D(0, sign * bracketLength / Math.cos(grad), thickness, 0, bracketPoint[i], grad, Math.PI / 2 + grad, Math.PI / 2 + grad), top2D, false);
    }
    let webPlate = [lwebPlate[3], rwebPlate[3], rwebPlate[4], lwebPlate[4]];
    result["web"] = vPlateGen(webPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [2, 3], [0, 1, 2, 3]);
    let uPoint = ToGlobalPoint(centerPoint, lwebPlate[4]);
    let l = Math.sqrt((lwebPlate[4].x - rwebPlate[4].x) ** 2 + (lwebPlate[4].y - rwebPlate[4].y) ** 2);
    let uflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: l, y: -xs.flangeWidth / 2 }, { x: l, y: xs.flangeWidth / 2 }];
    result["uflange"] = hPlateGen(uflangePlate, uPoint, xs.flangeThickness, 0, uPoint.skew, 0, uRad,
      hPlateSide2D(0, l, xs.flangeThickness, 0, lwebPlate[4], uRad, Math.PI / 2 + uRad, Math.PI / 2 + uRad), true, [0, 1]);
    let lPoint = ToGlobalPoint(centerPoint, lwebPlate[3]);
    let ll = Math.sqrt((lwebPlate[3].x - rwebPlate[3].x) ** 2 + (lwebPlate[3].y - rwebPlate[3].y) ** 2);
    let lflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: ll, y: -xs.flangeWidth / 2 }, { x: ll, y: xs.flangeWidth / 2 }];
    result["lflange"] = hPlateGen(lflangePlate, lPoint, xs.flangeThickness, -xs.flangeThickness, uPoint.skew, 0, lRad,
      hPlateSide2D(0, ll, -xs.flangeThickness, 0, lwebPlate[3], lRad, Math.PI / 2 + lRad, Math.PI / 2 + lRad), false, [0, 1]);

    let joint = IbeamJoint(webPlate, centerPoint, xs, wBolt, fBolt);
    for (let i in joint) { result[i] = joint[i]; }

    let data = [ToGlobalPoint(centerPoint, { x: (lwebPlate[0].x + lwebPlate[1].x) / 2, y: (lwebPlate[0].y + lwebPlate[1].y) / 2, z: (lwebPlate[0].z + lwebPlate[1].z) / 2 }),
    ToGlobalPoint(centerPoint, { x: (rwebPlate[0].x + rwebPlate[1].x) / 2, y: (rwebPlate[0].y + rwebPlate[1].y) / 2, z: (rwebPlate[0].z + rwebPlate[1].z) / 2 })];
    let section = [xs.flangeWidth, xs.flangeThickness, xs.flangeWidth, xs.flangeThickness, xs.webHeight, xs.webThickness];

    return { result, data, section }
  }

  function DYXbeam2(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
    let xs = {
      bracketLength: 420,
      bracketWidth: 550,
      bracketFilletR: 150,
      webHeight: 878,
      webThickness: 12,
      flangeWidth: 250,
      flangeThickness: 12,
      stiffThickness: 12,
      stiffWidth: 100,
      scallopRadius: 25,
      webJointThickness: 10,
      webJointWidth: 330,
      webJointHeight: 780,
      flangeJointThickness: 10,
      flangeJointLength: 480,
      flangeJointWidth: 80,
    };
    let wBolt = {
      P: 100,
      G: 75,
      pNum: 8,
      gNum: 2,
      size: 37,
      dia: 22,
      t: 14,
    };
    let fBolt = {
      P: 170,
      G: 75,
      pNum: 2,
      gNum: 3,
      size: 37,
      dia: 22,
      t: 14,
    };

    let result = {};
    let tlength = Math.sqrt((iPoint.x - jPoint.x) ** 2 + (iPoint.y - jPoint.y) ** 2);
    let vec = { x: (jPoint.x - iPoint.x) / tlength, y: (jPoint.y - iPoint.y) / tlength };
    let dOffset = (jPoint.offset - iPoint.offset) / 2;
    let dz = (jPoint.z - iPoint.z) / 2;

    let centerPoint = {
      x: (iPoint.x + jPoint.x) / 2,
      y: (iPoint.y + jPoint.y) / 2,
      z: (iPoint.z + jPoint.z) / 2,
      normalCos: iPoint.normalCos,
      normalSin: iPoint.normalSin,
      offset: (iPoint.offset + jPoint.offset) / 2
    };
    let cw = (centerPoint.normalCos * vec.y - centerPoint.normalSin * vec.x) > 0 ? 1 : -1; // 반시계방향의 경우 1
    centerPoint.skew = 90 + cw * Math.acos(centerPoint.normalCos * vec.x + centerPoint.normalSin * vec.y) * 180 / Math.PI;
    const rightAngle = Math.PI / 2;

    //폐합시를 고려하여 예외처리 필요
    let ufl, ufr;
    if (iSectionPoint.uflange[2].length > 0) {
      ufl = { x: iSectionPoint.uflange[2][1].x - dOffset, y: iSectionPoint.uflange[2][1].y - dz };
    } else {
      ufl = { x: iSectionPoint.uflange[1][0].x - dOffset, y: iSectionPoint.uflange[1][0].y - dz };
    }
    if (jSectionPoint.uflange[2].length > 0) {
      ufr = { x: jSectionPoint.uflange[2][0].x + dOffset, y: jSectionPoint.uflange[2][0].y + dz };
    } else {
      ufr = { x: jSectionPoint.uflange[0][0].x + dOffset, y: jSectionPoint.uflange[0][0].y + dz };
    }
    // let lfl = { x: iSectionPoint.lflange[1][0].x - dOffset, y: iSectionPoint.lflange[1][0].y - dz };
    // let lfr = { x: jSectionPoint.lflange[0][0].x + dOffset, y: jSectionPoint.lflange[0][0].y + dz };

    let tl = { x: iSectionPoint.web[1][2].x - dOffset, y: iSectionPoint.web[1][2].y - dz };
    let tr = { x: jSectionPoint.web[0][2].x + dOffset, y: jSectionPoint.web[0][2].y + dz };
    let bl = { x: iSectionPoint.web[1][3].x - dOffset, y: iSectionPoint.web[1][3].y - dz };
    let br = { x: jSectionPoint.web[0][3].x + dOffset, y: jSectionPoint.web[0][3].y + dz };

    let uGradient = (ufr.y - ufl.y) / (ufr.x - ufl.x);
    let lGradient = (tr.y - tl.y) / (tr.x - tl.x);
    let uRad = -Math.atan(uGradient);
    let lRad = -Math.atan(lGradient);

    let lwebPlate = [tl, { x: tl.x, y: tl.y - xs.webHeight }, { x: tl.x + xs.bracketLength, y: tl.y - xs.webHeight + lGradient * xs.bracketLength },
      { x: tl.x + xs.bracketLength, y: ufl.y + uGradient * (xs.bracketLength - (ufl.x - tl.x)) }, ufl];
    result["lweb"] = vPlateGen(lwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3], null);
    let lstiff = [{ x: tl.x, y: tl.y - xs.webHeight - xs.flangeThickness }, bl, { x: bl.x + xs.stiffWidth, y: bl.y },
    { x: tl.x + xs.bracketLength, y: tl.y - xs.webHeight - xs.flangeThickness + lGradient * xs.bracketLength - 30 }, { x: tl.x + xs.bracketLength, y: tl.y - xs.webHeight - xs.flangeThickness + lGradient * xs.bracketLength }];
    result["lstiff"] = vPlateGen(lstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);

    let lL = Math.sqrt((lstiff[2].x - lstiff[3].x) ** 2 + (lstiff[2].y - lstiff[3].y) ** 2);
    let lrot = -Math.atan((lstiff[2].y - lstiff[3].y) / (lstiff[2].x - lstiff[3].x));
    let lPlate = [{ x: -lL / 2 + 30, y: 30 }, { x: -lL / 2 + 120, y: 60 }, { x: lL / 2 - 120, y: 60 }, { x: lL / 2 - 30, y: 30 }, { x: lL / 2 - 30, y: -30 }, { x: lL / 2 - 120, y: -60 }, { x: -lL / 2 + 120, y: -60 }, { x: -lL / 2 + 30, y: -30 }];
    let cp = { x: (lstiff[2].x + lstiff[3].x) / 2, y: (lstiff[2].y + lstiff[3].y) / 2 };
    result["lstiffPlate"] = hPlateGen(lPlate, ToGlobalPoint(centerPoint, cp), 12, -12, centerPoint.skew, 0, lrot,
      hPlateSide2D(-lL / 2, lL / 2, 12, -12, cp, lrot, rightAngle, rightAngle), false, false);

    let rwebPlate = [tr, { x: tr.x, y: tr.y - xs.webHeight }, { x: tr.x - xs.bracketLength, y: tr.y - xs.webHeight - lGradient * xs.bracketLength },
      { x: tr.x - xs.bracketLength, y: ufr.y - uGradient * (xs.bracketLength - (tr.x - ufr.x)) }, ufr];
    result["rweb"] = vPlateGen(rwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3], null);
    let rstiff = [{ x: tr.x, y: tr.y - xs.webHeight - xs.flangeThickness }, br, { x: br.x - xs.stiffWidth, y: br.y },
    { x: tr.x - xs.bracketLength, y: tr.y - xs.webHeight - xs.flangeThickness - lGradient * xs.bracketLength - 30 }, { x: tr.x - xs.bracketLength, y: tr.y - xs.webHeight - xs.flangeThickness - lGradient * xs.bracketLength }];

    PlateRestPoint({ x: tr.x, y: tr.y - xs.webHeight - xs.flangeThickness }, br, lGradient, 0, -xs.stiffWidth);
    result["rstiff"] = vPlateGen(rstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);

    let rL = Math.sqrt((rstiff[2].x - rstiff[3].x) ** 2 + (rstiff[2].y - rstiff[3].y) ** 2);
    let rrot = -Math.atan((rstiff[2].y - rstiff[3].y) / (rstiff[2].x - rstiff[3].x));
    let rPlate = [{ x: -rL / 2 + 30, y: 30 }, { x: -rL / 2 + 120, y: 60 }, { x: rL / 2 - 120, y: 60 }, { x: rL / 2 - 30, y: 30 }, { x: rL / 2 - 30, y: -30 }, { x: rL / 2 - 120, y: -60 }, { x: -rL / 2 + 120, y: -60 }, { x: -rL / 2 + 30, y: -30 }];
    let rcp = { x: (rstiff[2].x + rstiff[3].x) / 2, y: (rstiff[2].y + rstiff[3].y) / 2 };
    result["rstiffPlate"] = hPlateGen(rPlate, ToGlobalPoint(centerPoint, rcp), 12, -12, centerPoint.skew, 0, rrot,
      hPlateSide2D(-rL / 2, rL / 2, 12, -12, rcp, rrot, rightAngle, rightAngle), false, false);



    let bracketPoint = [lstiff[0], rstiff[0], ufl, ufr];
    for (let i = 0; i < 4; i++) {
      let sign = i % 2 === 0 ? 1 : -1;
      let grad = i < 2 ? lRad : uRad;
      let bracketLength = i < 2 ? xs.bracketLength : i === 2 ? xs.bracketLength - (ufl.x - tl.x) : xs.bracketLength - (tr.x - ufr.x);
      let lowerbracket1 = [{ x: 0, y: xs.bracketWidth / 2 }, { x: sign * 15, y: xs.bracketWidth / 2 }, { x: sign * 44, y: xs.bracketWidth / 2 - 82 }, { x: sign * bracketLength, y: xs.flangeWidth / 2 },
      { x: sign * bracketLength, y: -xs.flangeWidth / 2 }, { x: sign * 44, y: -xs.bracketWidth / 2 + 82 }, { x: sign * 15, y: -xs.bracketWidth / 2 }, { x: 0, y: -xs.bracketWidth / 2 }];
      let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], xs.bracketFilletR, 4),
      lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], xs.bracketFilletR, 4),
      lowerbracket1[6], lowerbracket1[7]];
      let th1 = i < 2 ? Math.PI / 2 + grad : rightAngle;
      let top2D = i < 2 ? false : true;
      result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, ToGlobalPoint(centerPoint, bracketPoint[i]), xs.flangeThickness, 0, centerPoint.skew, 0, grad,
        hPlateSide2D(0, sign * bracketLength / Math.cos(grad), xs.flangeThickness, 0, bracketPoint[i], grad, th1, Math.PI / 2 + grad), top2D, false);
      // {
      //   points: bracketShape,
      //   Thickness: xs.flangeThickness,
      //   z: 0,
      //   rotationX: 0,
      //   rotationY: grad, 
      //   hole: [],
      //   point: bracketPoint[i],
      //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
      //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
      // }
    }
    let webPlate = [lwebPlate[2], rwebPlate[2], rwebPlate[3], lwebPlate[3]];
    result["web"] = vPlateGen(webPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [2, 3], [0, 1, 2, 3]);
    let uPoint = ToGlobalPoint(centerPoint, lwebPlate[3]); //가로보 중심축을 기준으로 해야 측면도상의 중심단면이 반영됨. 추후 수정 필요
    let l = Math.sqrt((lwebPlate[3].x - rwebPlate[3].x) ** 2 + (lwebPlate[3].y - rwebPlate[3].y) ** 2);
    let uflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: l, y: -xs.flangeWidth / 2 }, { x: l, y: xs.flangeWidth / 2 }];
    result["uflange"] = hPlateGen(uflangePlate, uPoint, xs.flangeThickness, 0, uPoint.skew, 0, uRad,
      hPlateSide2D(0, l, xs.flangeThickness, 0, lwebPlate[3], uRad, Math.PI / 2 + uRad, Math.PI / 2 + uRad), true, [0, 1]);
    let lPoint = ToGlobalPoint(centerPoint, lwebPlate[2]);
    let ll = Math.sqrt((lwebPlate[2].x - rwebPlate[2].x) ** 2 + (lwebPlate[2].y - rwebPlate[2].y) ** 2);
    let lflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: ll, y: -xs.flangeWidth / 2 }, { x: ll, y: xs.flangeWidth / 2 }];
    result["lflange"] = hPlateGen(lflangePlate, lPoint, xs.flangeThickness, -xs.flangeThickness, uPoint.skew, 0, lRad,
      hPlateSide2D(0, ll, -xs.flangeThickness, 0, lwebPlate[2], lRad, Math.PI / 2 + lRad, Math.PI / 2 + lRad), false, [0, 1]);

    let joint = IbeamJoint(webPlate, centerPoint, xs, wBolt, fBolt);
    for (let i in joint) { result[i] = joint[i]; }

    let data = [ToGlobalPoint(centerPoint, { x: (lwebPlate[0].x + lwebPlate[1].x) / 2, y: (lwebPlate[0].y + lwebPlate[1].y) / 2, z: (lwebPlate[0].z + lwebPlate[1].z) / 2 }),
    ToGlobalPoint(centerPoint, { x: (rwebPlate[0].x + rwebPlate[1].x) / 2, y: (rwebPlate[0].y + rwebPlate[1].y) / 2, z: (rwebPlate[0].z + rwebPlate[1].z) / 2 })];
    let section = [xs.flangeWidth, xs.flangeThickness, xs.flangeWidth, xs.flangeThickness, xs.webHeight, xs.webThickness];
    return { result, data, section }
  }


  function DYXbeam1(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
    let xs = {
      bracketLength: 541,
      bracketWidth: 450,
      bracketFilletR: 100,
      webHeight: 578,
      webThickness: 12,
      flangeWidth: 250,
      flangeThickness: 12,
      stiffThickness: 12,
      stiffWidth: 150,
      scallopRadius: 25,
      webJointThickness: 10,
      webJointWidth: 330,
      webJointHeight: 440,
      flangeJointThickness: 10,
      flangeJointLength: 480,
      flangeJointWidth: 80,
    };
    let wBolt = {
      P: 90,
      G: 75,
      pNum: 5,
      gNum: 2,
      size: 37,
      dia: 22,
      t: 14,
    };
    let fBolt = {
      P: 170,
      G: 75,
      pNum: 2,
      gNum: 3,
      size: 37,
      dia: 22,
      t: 14,
    };

    let result = {};
    let tlength = Math.sqrt((iPoint.x - jPoint.x) ** 2 + (iPoint.y - jPoint.y) ** 2);
    let vec = { x: (jPoint.x - iPoint.x) / tlength, y: (jPoint.y - iPoint.y) / tlength };
    let dOffset = (jPoint.offset - iPoint.offset) / 2;
    let dz = (jPoint.z - iPoint.z) / 2;

    let centerPoint = {
      x: (iPoint.x + jPoint.x) / 2,
      y: (iPoint.y + jPoint.y) / 2,
      z: (iPoint.z + jPoint.z) / 2,
      normalCos: iPoint.normalCos,
      normalSin: iPoint.normalSin,
      offset: (iPoint.offset + jPoint.offset) / 2
    };
    let cw = (centerPoint.normalCos * vec.y - centerPoint.normalSin * vec.x) > 0 ? 1 : -1; // 반시계방향의 경우 1
    centerPoint.skew = 90 + cw * Math.acos(centerPoint.normalCos * vec.x + centerPoint.normalSin * vec.y) * 180 / Math.PI;
    const rightAngle = Math.PI / 2;

    let ufl, ufr;
    if (iSectionPoint.uflange[2].length > 0) {
      ufl = { x: iSectionPoint.uflange[2][1].x - dOffset, y: iSectionPoint.uflange[2][1].y - dz };
    } else {
      ufl = { x: iSectionPoint.uflange[1][0].x - dOffset, y: iSectionPoint.uflange[1][0].y - dz };
    }
    if (jSectionPoint.uflange[2].length > 0) {
      ufr = { x: jSectionPoint.uflange[2][0].x + dOffset, y: jSectionPoint.uflange[2][0].y + dz };
    } else {
      ufr = { x: jSectionPoint.uflange[0][0].x + dOffset, y: jSectionPoint.uflange[0][0].y + dz };
    }
    // let lfl = { x: iSectionPoint.lflange[1][0].x - dOffset, y: iSectionPoint.lflange[1][0].y - dz };
    // let lfr = { x: jSectionPoint.lflange[0][0].x + dOffset, y: jSectionPoint.lflange[0][0].y + dz };

    let tl = { x: iSectionPoint.web[1][2].x - dOffset, y: iSectionPoint.web[1][2].y - dz };
    let tr = { x: jSectionPoint.web[0][2].x + dOffset, y: jSectionPoint.web[0][2].y + dz };
    let bl = { x: iSectionPoint.web[1][3].x - dOffset, y: iSectionPoint.web[1][3].y - dz };
    let br = { x: jSectionPoint.web[0][3].x + dOffset, y: jSectionPoint.web[0][3].y + dz };

    let uGradient = (ufr.y - ufl.y) / (ufr.x - ufl.x);
    let lGradient = (tr.y - tl.y) / (tr.x - tl.x);
    let uRad = -Math.atan(uGradient);
    let lRad = -Math.atan(lGradient);

    let lwebPlate = [tl, { x: tl.x, y: tl.y - xs.webHeight }, { x: tl.x + xs.bracketLength, y: tl.y - xs.webHeight + lGradient * xs.bracketLength },
      { x: tl.x + xs.bracketLength, y: ufl.y + uGradient * (xs.bracketLength - (ufl.x - tl.x)) }, ufl];
    result["lweb"] = vPlateGen(lwebPlate, centerPoint, xs.webThickness, [], 0, null, null, []);
    let lstiff = PlateRestPoint({ x: tl.x, y: tl.y - xs.webHeight - xs.flangeThickness }, bl, lGradient, 0, xs.stiffWidth);
    result["lstiff"] = vPlateGen(lstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);

    let rwebPlate = [tr, { x: tr.x, y: tr.y - xs.webHeight }, { x: tr.x - xs.bracketLength, y: tr.y - xs.webHeight - lGradient * xs.bracketLength },
      { x: tr.x - xs.bracketLength, y: ufr.y - uGradient * (xs.bracketLength - (tr.x - ufr.x)) }, ufr];
    result["rweb"] = vPlateGen(rwebPlate, centerPoint, xs.webThickness, [], 0, null, null, []);
    let rstiff = PlateRestPoint({ x: tr.x, y: tr.y - xs.webHeight - xs.flangeThickness }, br, lGradient, 0, -xs.stiffWidth);
    result["rstiff"] = vPlateGen(rstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);

    let bracketPoint = [lstiff[0], rstiff[0], ufl, ufr];
    for (let i = 0; i < 4; i++) {
      let sign = i % 2 === 0 ? 1 : -1;
      let grad = i < 2 ? lRad : uRad;
      let th1 = i < 2 ? Math.PI / 2 + grad : rightAngle;
      let bracketLength = i < 2 ? xs.bracketLength : i === 2 ? xs.bracketLength - (ufl.x - tl.x) : xs.bracketLength - (tr.x - ufr.x);
      let lowerbracket1 = [{ x: 0, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.flangeWidth / 2 }, { x: sign * bracketLength, y: xs.flangeWidth / 2 },
      { x: sign * bracketLength, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.bracketWidth / 2 }, { x: 0, y: -xs.bracketWidth / 2 }];
      let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], xs.bracketFilletR, 4),
      lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], xs.bracketFilletR, 4),
      lowerbracket1[6], lowerbracket1[7]];
      let top2D = i < 2 ? false : true;
      result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, ToGlobalPoint(centerPoint, bracketPoint[i]), xs.flangeThickness, 0, centerPoint.skew, 0, grad,
        hPlateSide2D(0, sign * bracketLength / Math.cos(grad), xs.flangeThickness, 0, bracketPoint[i], grad, th1, Math.PI / 2 + grad), top2D, false);
      // {
      //   points: bracketShape,
      //   Thickness: xs.flangeThickness,
      //   z: 0,
      //   rotationX: 0,
      //   rotationY: grad,
      //   hole: [],
      //   point: bracketPoint[i],
      //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
      //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
      // }
    }
    let webPlate = [lwebPlate[2], rwebPlate[2], rwebPlate[3], lwebPlate[3]];
    result["web"] = vPlateGen(webPlate, centerPoint, xs.webThickness, [], 0, null, null, []);
    let uPoint = ToGlobalPoint(centerPoint, lwebPlate[3]);
    let l = Math.sqrt((lwebPlate[3].x - rwebPlate[3].x) ** 2 + (lwebPlate[3].y - rwebPlate[3].y) ** 2);
    let uflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: l, y: -xs.flangeWidth / 2 }, { x: l, y: xs.flangeWidth / 2 }];
    result["uflange"] = hPlateGen(uflangePlate, uPoint, xs.flangeThickness, 0, uPoint.skew, 0, uRad,
      hPlateSide2D(0, l, xs.flangeThickness, 0, lwebPlate[3], uRad, Math.PI / 2 + uRad, Math.PI / 2 + uRad), true, [0, 1]);
    let lPoint = ToGlobalPoint(centerPoint, lwebPlate[2]);
    let ll = Math.sqrt((lwebPlate[2].x - rwebPlate[2].x) ** 2 + (lwebPlate[2].y - rwebPlate[2].y) ** 2);
    let lflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: ll, y: -xs.flangeWidth / 2 }, { x: ll, y: xs.flangeWidth / 2 }];
    result["lflange"] = hPlateGen(lflangePlate, lPoint, xs.flangeThickness, -xs.flangeThickness, uPoint.skew, 0, lRad,
      hPlateSide2D(0, ll, -xs.flangeThickness, 0, lwebPlate[2], lRad, Math.PI / 2 + lRad, Math.PI / 2 + lRad), false, [0, 1]);

    let joint = IbeamJoint(webPlate, centerPoint, xs, wBolt, fBolt);
    for (let i in joint) { result[i] = joint[i]; }

    let data = [ToGlobalPoint(centerPoint, { x: (lwebPlate[0].x + lwebPlate[1].x) / 2, y: (lwebPlate[0].y + lwebPlate[1].y) / 2, z: (lwebPlate[0].z + lwebPlate[1].z) / 2 }),
    ToGlobalPoint(centerPoint, { x: (rwebPlate[0].x + rwebPlate[1].x) / 2, y: (rwebPlate[0].y + rwebPlate[1].y) / 2, z: (rwebPlate[0].z + rwebPlate[1].z) / 2 })]; //[cbWeb[0].x, tlength - cbWeb[3].x]; //임시 강역값 입력 20.03.24  by jhlim  
    // let webHeight = ((iTopNode2.y - iBottomNode2.y) + (jTopNode2.y - jBottomNode2.y))/2
    let section = [xs.flangeWidth, xs.flangeThickness, xs.flangeWidth, xs.flangeThickness, xs.webHeight, xs.webThickness];// [upperFlangeWidth,upperFlangeThickness,lowerFlangeWidth,lowerFlangeThickness,webHeight, webThickness ]
    return { result, data, section }
  }

  function XbeamI0(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
    const result = {};
    let data = [];
    // const connectorLength = xbeamSection.connectorLength
    // const connectorWidth = xbeamSection.connectorWidth
    // const upperFlangeThickness = xbeamSection.upperFlangeThickness
    // const upperFlangeWidth = xbeamSection.upperFlangeWidth
    const lowerFlangeThickness = xbeamSection.lowerFlangeThickness;
    const lowerFlangeWidth = xbeamSection.lowerFlangeWidth;
    const vStiffThickness = xbeamSection.vStiffThickness;
    const vStiffBottomOffset = xbeamSection.vStiffBottomOffset;
    const vStiffWidth = xbeamSection.vStiffWidth;
    const vStiffendFillet = xbeamSection.vStiffendFillet;
    // const webThickness = xbeamSection.webThickness
    const scallopRadius = xbeamSection.scallopRadius;
    // 추후 변수정리 및 웹을 기준으로 하는 방법에서 하부플랜지 기준높이로 바꿔야 양측의 다이아프램과 매칭이 가능함
    let xs = {
      bracketLength: xbeamSection.connectorLength,
      bracketWidth: xbeamSection.connectorWidth,
      bracketFilletR: 100,
      webHeight: 1500,
      webThickness: xbeamSection.webThickness,
      flangeWidth: xbeamSection.upperFlangeWidth,
      flangeThickness: xbeamSection.upperFlangeThickness,
      stiffThickness: 12,
      stiffWidth: 150,
      scallopRadius: xbeamSection.scallopRadius,
      webJointThickness: 10,
      webJointWidth: 350,
      webJointHeight: 1380,
      flangeJointThickness: 10,
      flangeJointLength: 520,
      flangeJointWidth: 130,
    };
    let wBolt = {
      P: 90,
      G: 75,
      pNum: 5,
      gNum: 2,
      size: 37,
      dia: 22,
      t: 14,
    };
    let fBolt = {
      P: 170,
      G: 75,
      pNum: 2,
      gNum: 3,
      size: 37,
      dia: 22,
      t: 14,
    };

    // let result = {};
    let tlength = Math.sqrt((iPoint.x - jPoint.x) ** 2 + (iPoint.y - jPoint.y) ** 2);
    let vec = { x: (jPoint.x - iPoint.x) / tlength, y: (jPoint.y - iPoint.y) / tlength };
    let dOffset = (jPoint.offset - iPoint.offset) / 2;
    let dz = (jPoint.z - iPoint.z) / 2;

    let centerPoint = {
      x: (iPoint.x + jPoint.x) / 2,
      y: (iPoint.y + jPoint.y) / 2,
      z: (iPoint.z + jPoint.z) / 2,
      normalCos: iPoint.normalCos,
      normalSin: iPoint.normalSin,
      offset: (iPoint.offset + jPoint.offset) / 2
    };
    let cw = (centerPoint.normalCos * vec.y - centerPoint.normalSin * vec.x) > 0 ? 1 : -1; // 반시계방향의 경우 1
    centerPoint.skew = 90 + cw * Math.acos(centerPoint.normalCos * vec.x + centerPoint.normalSin * vec.y) * 180 / Math.PI;
    const rightAngle = Math.PI / 2;

    let ufl, ufr;
    if (iSectionPoint.uflange[2].length > 0) {
      ufl = { x: iSectionPoint.uflange[2][1].x - dOffset, y: iSectionPoint.uflange[2][1].y - dz };
    } else {
      ufl = { x: iSectionPoint.uflange[1][0].x - dOffset, y: iSectionPoint.uflange[1][0].y - dz };
    }
    if (jSectionPoint.uflange[2].length > 0) {
      ufr = { x: jSectionPoint.uflange[2][0].x + dOffset, y: jSectionPoint.uflange[2][0].y + dz };
    } else {
      ufr = { x: jSectionPoint.uflange[0][0].x + dOffset, y: jSectionPoint.uflange[0][0].y + dz };
    }
    // let lfl = { x: iSectionPoint.lflange[1][0].x - dOffset, y: iSectionPoint.lflange[1][0].y - dz };
    // let lfr = { x: jSectionPoint.lflange[0][0].x + dOffset, y: jSectionPoint.lflange[0][0].y + dz };

    let tl = { x: iSectionPoint.web[1][2].x - dOffset, y: iSectionPoint.web[1][2].y - dz };
    let tr = { x: jSectionPoint.web[0][2].x + dOffset, y: jSectionPoint.web[0][2].y + dz };
    let bl = { x: iSectionPoint.web[1][3].x - dOffset, y: iSectionPoint.web[1][3].y - dz };
    let br = { x: jSectionPoint.web[0][3].x + dOffset, y: jSectionPoint.web[0][3].y + dz };

    let uGradient = (ufr.y - ufl.y) / (ufr.x - ufl.x);
    let lGradient = (tr.y - tl.y) / (tr.x - tl.x);
    let uRad = -Math.atan(uGradient);
    let lRad = -Math.atan(lGradient);

    let lwCot = (tl.x - bl.x) / (tl.y - bl.y);
    let rwCot = (tr.x - br.x) / (tr.y - br.y);
    let lwebPlate = [tl, { x: tl.x - xs.webHeight * lwCot, y: tl.y - xs.webHeight }, { x: tl.x + xs.bracketLength, y: tl.y - xs.webHeight + lGradient * xs.bracketLength },
      { x: tl.x + xs.bracketLength, y: ufl.y + uGradient * (xs.bracketLength - (ufl.x - tl.x)) }, ufl];
    result["lweb"] = vPlateGen(lwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3]);

    let rwebPlate = [tr, { x: tr.x - xs.webHeight * rwCot, y: tr.y - xs.webHeight }, { x: tr.x - xs.bracketLength, y: tr.y - xs.webHeight - lGradient * xs.bracketLength },
      { x: tr.x - xs.bracketLength, y: ufr.y - uGradient * (xs.bracketLength - (tr.x - ufr.x)) }, ufr];
    result["rweb"] = vPlateGen(rwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3]);

    let bracketPoint = [{ x: tl.x - (xs.webHeight + xs.flangeThickness) * lwCot, y: tl.y - xs.webHeight - xs.flangeThickness },
    { x: tr.x - (xs.webHeight + xs.flangeThickness) * rwCot, y: tr.y - xs.webHeight - xs.flangeThickness }, ufl, ufr];
    let bracketLengthList = [xs.bracketLength + (xs.webHeight + xs.flangeThickness) * lwCot,
    xs.bracketLength - (xs.webHeight + xs.flangeThickness) * rwCot,
    xs.bracketLength - (ufl.x - tl.x),
    xs.bracketLength - (tr.x - ufr.x)
    ];
    for (let i = 0; i < 4; i++) {
      let sign = i % 2 === 0 ? 1 : -1;
      let grad = i < 2 ? lRad : uRad;
      let th1 = i < 2 ? Math.PI / 2 + grad : rightAngle;
      let bracketLength = bracketLengthList[i];
      let lowerbracket1 = [{ x: 0, y: xs.bracketWidth / 2 }, { x: sign * 15, y: xs.bracketWidth / 2 }, { x: sign * 44, y: xs.bracketWidth / 2 - 82 }, { x: sign * bracketLength, y: xs.flangeWidth / 2 },
      { x: sign * bracketLength, y: -xs.flangeWidth / 2 }, { x: sign * 44, y: -xs.bracketWidth / 2 + 82 }, { x: sign * 15, y: -xs.bracketWidth / 2 }, { x: 0, y: -xs.bracketWidth / 2 }];
      let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], xs.bracketFilletR, 4),
      lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], xs.bracketFilletR, 4),
      lowerbracket1[6], lowerbracket1[7]];
      let top2D = i < 2 ? false : true;
      result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, ToGlobalPoint(centerPoint, bracketPoint[i]), xs.flangeThickness, 0, centerPoint.skew, 0, grad,
        hPlateSide2D(0, sign * bracketLength / Math.cos(grad), xs.flangeThickness, 0, bracketPoint[i], grad, th1, Math.PI / 2 + grad), top2D, false);
      //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
      //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    }
    let webPlate = [lwebPlate[2], rwebPlate[2], rwebPlate[3], lwebPlate[3]];
    result["web"] = vPlateGen(webPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [2, 3]);
    let uPoint = ToGlobalPoint(centerPoint, lwebPlate[3]);
    let l = Math.sqrt((lwebPlate[3].x - rwebPlate[3].x) ** 2 + (lwebPlate[3].y - rwebPlate[3].y) ** 2);
    let uflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: l, y: -xs.flangeWidth / 2 }, { x: l, y: xs.flangeWidth / 2 }];
    result["uflange"] = hPlateGen(uflangePlate, uPoint, xs.flangeThickness, 0, uPoint.skew, 0, uRad,
      hPlateSide2D(0, l, xs.flangeThickness, 0, lwebPlate[3], uRad, Math.PI / 2 + uRad, Math.PI / 2 + uRad), true, [0, 1]);
    let lPoint = ToGlobalPoint(centerPoint, lwebPlate[2]);
    let ll = Math.sqrt((lwebPlate[2].x - rwebPlate[2].x) ** 2 + (lwebPlate[2].y - rwebPlate[2].y) ** 2);
    let lflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: ll, y: -xs.flangeWidth / 2 }, { x: ll, y: xs.flangeWidth / 2 }];
    result["lflange"] = hPlateGen(lflangePlate, lPoint, xs.flangeThickness, -xs.flangeThickness, uPoint.skew, 0, lRad,
      hPlateSide2D(0, ll, -xs.flangeThickness, 0, lwebPlate[2], lRad, Math.PI / 2 + lRad, Math.PI / 2 + lRad), false, [0, 1]);

    let joint = IbeamJoint(webPlate, centerPoint, xs, wBolt, fBolt);
    for (let i in joint) { result[i] = joint[i]; }

    data = [ToGlobalPoint(centerPoint, { x: (lwebPlate[0].x + lwebPlate[1].x) / 2, y: (lwebPlate[0].y + lwebPlate[1].y) / 2, z: (lwebPlate[0].z + lwebPlate[1].z) / 2 }),
    ToGlobalPoint(centerPoint, { x: (rwebPlate[0].x + rwebPlate[1].x) / 2, y: (rwebPlate[0].y + rwebPlate[1].y) / 2, z: (rwebPlate[0].z + rwebPlate[1].z) / 2 })]; //[cbWeb[0].x, tlength - cbWeb[3].x]; //임시 강역값 입력 20.03.24  by jhlim  
    // let webHeight = ((iTopNode2.y - iBottomNode2.y) + (jTopNode2.y - jBottomNode2.y))/2
    let section = [xs.flangeWidth, xs.flangeThickness, xs.flangeWidth, xs.flangeThickness, xs.webHeight, xs.webThickness];// [upperFlangeWidth,upperFlangeThickness,lowerFlangeWidth,lowerFlangeThickness,webHeight, webThickness ]
    let gradientX = (iPoint.gradientX + jPoint.gradientX) / 2;
    let bottom = { x: (lwebPlate[2].x + rwebPlate[2].x) / 2, y: (lwebPlate[2].y + rwebPlate[2].y) / 2 };
    let top = { x: (ufl.x + ufr.x) / 2, y: (ufl.y + ufr.y) / 2 };
    let vStiffLength = top.y - bottom.y - vStiffBottomOffset;
    let vStiffPlate = [{ x: 0, y: -xs.webThickness / 2 },
    { x: vStiffLength, y: -xs.webThickness / 2 },
    { x: vStiffLength, y: -xs.webThickness / 2 - vStiffWidth },
    { x: -(vStiffWidth) * gradientX, y: -xs.webThickness / 2 - vStiffWidth }];

    let vStiffTopFillet = Math.max(vStiffWidth - (xs.flangeWidth - xs.webThickness) / 2, 0);
    let vStiffPoint = [];
    vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[1], vStiffPlate[0], vStiffPlate[3], scallopRadius, 4));
    vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[0], vStiffPlate[3], vStiffPlate[2], vStiffTopFillet, 1));
    vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[3], vStiffPlate[2], vStiffPlate[1], vStiffendFillet, 1));
    vStiffPoint.push(vStiffPlate[1]);
    let ang90 = Math.PI / 2;
    result['vStiffner'] = hPlateGenV2(vStiffPoint, centerPoint, top, vStiffThickness, -vStiffThickness / 2, centerPoint.skew, 0, ang90, ang90, ang90, true, null);
    return { result, data, section }
  }

  function XbeamK0(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection, sectionDB) {
    const result = {};
    let data = [];
    //K형가로보는 skew를 허용하지 않고 생성됨.
    const topOffset = xbeamSection.topOffset;
    const bottomOffset = xbeamSection.bottomOffset;
    const gussetThickness = xbeamSection.gussetThickness;
    const gussetBondingLength = xbeamSection.gussetBondingLength;
    const gussetWeldingOffset = xbeamSection.gussetWeldingOffset;
    const gussetTopWidth = xbeamSection.gussetTopWidth;
    const gussetBottomWidth = xbeamSection.gussetBottomWidth;
    const gussetCenterWidth = xbeamSection.gussetCenterWidth;
    const hFrameEndOffset = xbeamSection.hFrameEndOffset;
    const diaFrameEndOffset = xbeamSection.diaFrameEndOffset;
    const tFrame = xbeamSection.tFrameName;
    const bFrame = xbeamSection.bFrameName;
    const dFrame = xbeamSection.dFrameName;
    const pts1 = PTS(tFrame, true, 1, sectionDB);
    const pts2 = PTS(bFrame, true, 1, sectionDB);
    const pts3 = PTS(dFrame, true, 1, sectionDB);


    let wBolt = {
      dia: 22,
      size: 37,
      t: 14,
    };

    let tlength = Math.sqrt((iPoint.x - jPoint.x) ** 2 + (iPoint.y - jPoint.y) ** 2);
    let vec = { x: (jPoint.x - iPoint.x) / tlength, y: (jPoint.y - iPoint.y) / tlength };
    let dOffset = (jPoint.offset - iPoint.offset) / 2;
    let dz = (jPoint.z - iPoint.z) / 2;

    let centerPoint = {
      x: (iPoint.x + jPoint.x) / 2,
      y: (iPoint.y + jPoint.y) / 2,
      z: (iPoint.z + jPoint.z) / 2,
      normalCos: iPoint.normalCos,
      normalSin: iPoint.normalSin,
      offset: (iPoint.offset + jPoint.offset) / 2
    };
    let cw = (centerPoint.normalCos * vec.y - centerPoint.normalSin * vec.x) > 0 ? 1 : -1; // 반시계방향의 경우 1
    centerPoint.skew = 90 + cw * Math.acos(centerPoint.normalCos * vec.x + centerPoint.normalSin * vec.y) * 180 / Math.PI;

    let tl = { x: iSectionPoint.web[1][2].x - dOffset, y: iSectionPoint.web[1][2].y - dz };
    let tr = { x: jSectionPoint.web[0][2].x + dOffset, y: jSectionPoint.web[0][2].y + dz };
    let bl = { x: iSectionPoint.web[1][3].x - dOffset, y: iSectionPoint.web[1][3].y - dz };
    let br = { x: jSectionPoint.web[0][3].x + dOffset, y: jSectionPoint.web[0][3].y + dz };

    const iCot = (tl.x - bl.x) / (tl.y - bl.y);
    const jCot = (tr.x - br.x) / (tr.y - br.y);
    let framePoints = [ //frame 기준 포인트
      { x: tl.x - topOffset * iCot, y: tl.y - topOffset },
      { x: tr.x - topOffset * jCot, y: tr.y - topOffset },
      { x: br.x + bottomOffset * jCot, y: br.y + bottomOffset },
      { x: bl.x + bottomOffset * iCot, y: bl.y + bottomOffset },
    ];
    let bottomCenter = { x: (framePoints[2].x + framePoints[3].x) / 2, y: (framePoints[2].y + framePoints[3].y) / 2 };
    let topFrame = Kframe(framePoints[0], framePoints[1], hFrameEndOffset, hFrameEndOffset, pts1);
    let bottomFrame = Kframe(framePoints[3], framePoints[2], hFrameEndOffset, hFrameEndOffset, pts2);
    let leftFrame = Kframe(framePoints[0], bottomCenter, diaFrameEndOffset, diaFrameEndOffset, pts3);
    let rightFrame = Kframe(bottomCenter, framePoints[1], diaFrameEndOffset, diaFrameEndOffset, pts3);

    let topVec = Vector2D(framePoints[0], framePoints[1]);
    let leftVec = Vector2D(framePoints[0], bottomCenter);
    let rightVec = Vector2D(bottomCenter, framePoints[1]);
    let bottomVec = Vector2D(framePoints[3], framePoints[2]);

    let boltLayout = [
      XYOffset(framePoints[0], topVec, hFrameEndOffset + 40, (pts1[0] + pts1[3]) / 2),
      XYOffset(framePoints[0], topVec, hFrameEndOffset + 120, (pts1[0] + pts1[3]) / 2),
      XYOffset(framePoints[0], topVec, hFrameEndOffset + 200, (pts1[0] + pts1[3]) / 2),
      XYOffset(framePoints[1], topVec, -hFrameEndOffset - 40, (pts1[0] + pts1[3]) / 2),
      XYOffset(framePoints[1], topVec, -hFrameEndOffset - 120, (pts1[0] + pts1[3]) / 2),
      XYOffset(framePoints[1], topVec, -hFrameEndOffset - 200, (pts1[0] + pts1[3]) / 2),
      XYOffset(framePoints[0], leftVec, diaFrameEndOffset + 40, (pts2[0] + pts2[3]) / 2),
      XYOffset(framePoints[0], leftVec, diaFrameEndOffset + 120, (pts2[0] + pts2[3]) / 2),
      XYOffset(framePoints[0], leftVec, diaFrameEndOffset + 200, (pts2[0] + pts2[3]) / 2),
      // XYOffset(framePoints[0],leftVec, diaFrameEndOffset + 280, (pts2[0]+pts2[3])/2 ),
      XYOffset(framePoints[1], rightVec, -diaFrameEndOffset - 40, (pts2[0] + pts2[3]) / 2),
      XYOffset(framePoints[1], rightVec, -diaFrameEndOffset - 120, (pts2[0] + pts2[3]) / 2),
      XYOffset(framePoints[1], rightVec, -diaFrameEndOffset - 200, (pts2[0] + pts2[3]) / 2),
      // XYOffset(framePoints[1],rightVec, -diaFrameEndOffset - 280, (pts2[0]+pts2[3])/2 ),
      XYOffset(framePoints[3], bottomVec, hFrameEndOffset + 40, (pts3[0] + pts3[3]) / 2),
      XYOffset(framePoints[3], bottomVec, hFrameEndOffset + 120, (pts3[0] + pts3[3]) / 2),
      XYOffset(framePoints[3], bottomVec, hFrameEndOffset + 200, (pts3[0] + pts3[3]) / 2),
      // XYOffset(framePoints[3],bottomVec, hFrameEndOffset + 280, (pts3[0]+pts3[3])/2 ),
      XYOffset(framePoints[2], bottomVec, -hFrameEndOffset - 40, (pts3[0] + pts3[3]) / 2),
      XYOffset(framePoints[2], bottomVec, -hFrameEndOffset - 120, (pts3[0] + pts3[3]) / 2),
      XYOffset(framePoints[2], bottomVec, -hFrameEndOffset - 200, (pts3[0] + pts3[3]) / 2),
      // XYOffset(framePoints[2],bottomVec, -hFrameEndOffset - 280, (pts3[0]+pts3[3])/2 ),
    ];
    let boltLayout2 = [];
    boltLayout.forEach(elem => boltLayout2.push([elem.x, elem.y]));
    let Bolt = {
      size: wBolt.size, dia: wBolt.dia, t: wBolt.t, l: gussetThickness * 2,
      layout: boltLayout2, isUpper: false
    };
    let centerGusset = [
      XYOffset(bottomCenter, bottomVec, -gussetCenterWidth / 2, pts2[3] - gussetWeldingOffset),
      XYOffset(bottomCenter, bottomVec, gussetCenterWidth / 2, pts2[3] - gussetWeldingOffset),
      XYOffset(bottomCenter, rightVec, (diaFrameEndOffset + gussetBondingLength), pts3[3] - gussetWeldingOffset),
      XYOffset(bottomCenter, rightVec, (diaFrameEndOffset + gussetBondingLength), pts3[0] + gussetWeldingOffset),
      XYOffset(bottomCenter, leftVec, -(diaFrameEndOffset + gussetBondingLength), pts3[0] + gussetWeldingOffset),
      XYOffset(bottomCenter, leftVec, -(diaFrameEndOffset + gussetBondingLength), pts3[3] - gussetWeldingOffset),
    ];
    result['centerGusset'] = vPlateGen(centerGusset, centerPoint, gussetThickness, [], 0, null, null, [], [3, 4], null);
    result['centerGusset']['bolt'] = Bolt;
    let leftTopGusset = [
      { x: tl.x - gussetWeldingOffset * iCot, y: tl.y - gussetWeldingOffset },
      XYOffset(framePoints[0], topVec, hFrameEndOffset + gussetBondingLength, pts1[0] + gussetWeldingOffset),
      XYOffset(framePoints[0], leftVec, diaFrameEndOffset + gussetBondingLength, pts3[0] + gussetWeldingOffset),
      XYOffset(framePoints[0], leftVec, diaFrameEndOffset + gussetBondingLength, pts3[3] - gussetWeldingOffset),
      { x: tl.x - (gussetWeldingOffset + gussetTopWidth) * iCot, y: tl.y - (gussetWeldingOffset + gussetTopWidth) },
    ];
    result['leftTopGusset'] = vPlateGen(leftTopGusset, centerPoint, gussetThickness, [], 0, null, null, [], [0, 2], null);
    let rightTopGusset = [
      { x: tr.x - gussetWeldingOffset * jCot, y: tr.y - gussetWeldingOffset },
      XYOffset(framePoints[1], topVec, -(hFrameEndOffset + gussetBondingLength), pts1[0] + gussetWeldingOffset),
      XYOffset(framePoints[1], rightVec, -(diaFrameEndOffset + gussetBondingLength), pts3[0] + gussetWeldingOffset),
      XYOffset(framePoints[1], rightVec, -(diaFrameEndOffset + gussetBondingLength), pts3[3] - gussetWeldingOffset),
      { x: tr.x - (gussetWeldingOffset + gussetTopWidth) * jCot, y: tr.y - (gussetWeldingOffset + gussetTopWidth) },
    ];
    result['rightTopGusset'] = vPlateGen(rightTopGusset, centerPoint, gussetThickness, [], 0, null, null, [], [0, 2], null);
    let leftBottomGusset = [
      { x: bl.x + gussetWeldingOffset * iCot, y: bl.y + gussetWeldingOffset },
      XYOffset(framePoints[3], bottomVec, hFrameEndOffset + gussetBondingLength, pts2[3] - gussetWeldingOffset),
      XYOffset(framePoints[3], bottomVec, hFrameEndOffset + gussetBondingLength, pts2[0] + gussetWeldingOffset),
      { x: bl.x + (gussetWeldingOffset + gussetBottomWidth) * iCot, y: bl.y + (gussetWeldingOffset + gussetBottomWidth) },
    ];
    result['leftBottomGusset'] = vPlateGen(leftBottomGusset, centerPoint, gussetThickness, [], 0, null, null, [], null, null);
    let rightBottomGusset = [
      { x: br.x + gussetWeldingOffset * jCot, y: br.y + gussetWeldingOffset },
      XYOffset(framePoints[2], bottomVec, -(hFrameEndOffset + gussetBondingLength), pts2[3] - gussetWeldingOffset),
      XYOffset(framePoints[2], bottomVec, -(hFrameEndOffset + gussetBondingLength), pts2[0] + gussetWeldingOffset),
      { x: br.x + (gussetWeldingOffset + gussetBottomWidth) * jCot, y: br.y + (gussetWeldingOffset + gussetBottomWidth) },
    ];
    result['rightBottomGusset'] = vPlateGen(rightBottomGusset, centerPoint, gussetThickness, [], 0, null, null, [], null, null);
    result['topFrame1'] = vFrameGen(topFrame[0], centerPoint, pts1[4], gussetThickness / 2, [0, 3, 1, 2], null);
    result['topFrame2'] = vFrameGen(topFrame[1], centerPoint, pts1[5], gussetThickness / 2, [0, 3, 1, 2], null);
    result['bottomFrame1'] = vFrameGen(bottomFrame[0], centerPoint, pts2[4], gussetThickness / 2, null, null);
    result['bottomFrame2'] = vFrameGen(bottomFrame[1], centerPoint, pts2[5], gussetThickness / 2, null, null);
    result['leftFrame1'] = vFrameGen(leftFrame[0], centerPoint, pts3[4], gussetThickness / 2, null, null);
    result['leftFrame2'] = vFrameGen(leftFrame[1], centerPoint, pts3[5], gussetThickness / 2, null, null);
    result['righttFrame1'] = vFrameGen(rightFrame[0], centerPoint, pts3[4], gussetThickness / 2, null, null);
    result['rightFrame2'] = vFrameGen(rightFrame[1], centerPoint, pts3[5], gussetThickness / 2, null, null);

    let dummyPoints = [...framePoints, bottomCenter];
    dummyPoints.forEach(function (elem) { data.push(ToGlobalPoint(centerPoint, elem)); });
    let section = [tFrame, bFrame, dFrame];   //사용자로부터 받은 단면요소의 값을 객체로 저장
    return { result, data, section }
  }

  function Xbeam(){
      this.addInput("gridPoint","gridPoint");
      this.addInput("sectionPointDict","sectionPointDict");
      this.addInput("xbeamLayout","arr");
      this.addInput("xbeamSectionList","xbeamSectionList");
      this.addInput("sectionDB","sectionDB");
      this.addOutput("diaDict","diaDict");
      this.addOutput("xbeamData","xbaemData");
    }
    
    Xbeam.prototype.onExecute = function() {
      const gridPoint = this.getInputData(0);
      const sectionPointDict = this.getInputData(1);
      const xbeamLayout = this.getInputData(2);
      const xbeamSectionList = this.getInputData(3);
      const result = XbeamDict(gridPoint, sectionPointDict, xbeamLayout, xbeamSectionList, this.getInputData(4));
      this.setOutputData(0, result.xbeamSectionDict);
      this.setOutputData(1, result.xbeamData);

    };

  // import { analysisOutput } from "../DB/module"

  function AnalysisModel(node, frame) {
      let modelGroup = new global.THREE.Group();
      let selfweightGroup = new global.THREE.Group();
      let slabweightGroup = new global.THREE.Group();
      let barrierGroup = new global.THREE.Group();
      let pavementGroup = new global.THREE.Group();
      let laneGroup = new global.THREE.Group();



      let layer = 2; //frame Layer
      let material = new global.THREE.PointsMaterial({ color: 0xff0000, size: 300 });
      let geometry = new global.THREE.Geometry(); // 추후에 bufferGeometry로 변경요망
      let initPoint = node.node.data[0].coord;
      let greenLine = new global.THREE.LineBasicMaterial({ color: 0x00ff00 });
      let aquaLine = new global.THREE.LineBasicMaterial({ color: 0x00ffff });
      let yellowLine = new global.THREE.LineBasicMaterial({ color: 0xffff00 });
      let circleMaterial = new global.THREE.MeshBasicMaterial({ color: 0xffff00 });
      let redDotLine = new global.THREE.LineDashedMaterial({ color: 0xff0000, dashSize: 300, gapSize: 100, });
      let redLine = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let elemDict = {};
      for (let i in node.node.data) {
          let pt = new global.THREE.Vector3(
              node.node.data[i].coord[0] - initPoint[0],
              node.node.data[i].coord[1] - initPoint[1],
              node.node.data[i].coord[2] - initPoint[2]);
          geometry.vertices.push(pt);
          let text = new global.SpriteText(node.node.data[i].nodeNum, 150);
          text.position.set(pt.x, pt.y, pt.z);
          text.layers.set(layer);
          text.backgroundColor = "red";
          modelGroup.add(text);
      }

      for (let i in node.rigid.data) {
          let mNum = node.rigid.data[i].master - 1;
          for (let j in node.rigid.data[i].slave) {
              let sNum = node.rigid.data[i].slave[j] - 1;
              let geo = new global.THREE.Geometry();
              geo.vertices.push(geometry.vertices[mNum], geometry.vertices[sNum]);
              modelGroup.add(new global.THREE.Line(geo, aquaLine));
          }
      }

      for (let i in frame.frame.data) {
          let geo = new global.THREE.Geometry();
          let iNum = frame.frame.data[i].iNode - 1;
          let jNum = frame.frame.data[i].jNode - 1;
          elemDict[frame.frame.data[i].number] = [iNum, jNum];
          geo.vertices.push(geometry.vertices[iNum], geometry.vertices[jNum]);
          modelGroup.add(new global.THREE.Line(geo, greenLine));

          let text = new global.SpriteText(frame.frame.data[i].number, 150, "red");
          text.position.set(
              (geometry.vertices[iNum].x + geometry.vertices[jNum].x) / 2,
              (geometry.vertices[iNum].y + geometry.vertices[jNum].y) / 2,
              (geometry.vertices[iNum].z + geometry.vertices[jNum].z) / 2);
          text.layers.set(layer);
          modelGroup.add(text);
      }


      // group.add(new THREE.Points(geometry, material));
      for (let i in frame.selfWeight.data) {
          let geo = new global.THREE.Geometry();
          let ivec = geometry.vertices[elemDict[frame.selfWeight.data[i].elem][0]];
          let jvec = geometry.vertices[elemDict[frame.selfWeight.data[i].elem][1]];
          let izload = frame.selfWeight.data[i].Uzp[0] * 0.2;
          let jzload = frame.selfWeight.data[i].Uzp[1] * 0.2;
          geo.vertices.push(ivec,
              new global.THREE.Vector3(ivec.x, ivec.y, ivec.z + izload),
              new global.THREE.Vector3(jvec.x, jvec.y, jvec.z + jzload),
              jvec);
          selfweightGroup.add(new global.THREE.Line(geo, aquaLine));
      }

      for (let i in frame.slabWeight.data) {
          let geo = new global.THREE.Geometry();
          let ivec = geometry.vertices[elemDict[frame.slabWeight.data[i].elem][0]];
          let jvec = geometry.vertices[elemDict[frame.slabWeight.data[i].elem][1]];
          let a = frame.slabWeight.data[i].RD[0];
          let b = frame.slabWeight.data[i].RD[1];
          let nivec = new global.THREE.Vector3(ivec.x * (1 - a) + jvec.x * a, ivec.y * (1 - a) + jvec.y * a, ivec.z * (1 - a) + jvec.z * a);
          let njvec = new global.THREE.Vector3(ivec.x * (1 - b) + jvec.x * b, ivec.y * (1 - b) + jvec.y * b, ivec.z * (1 - b) + jvec.z * b);
          let izload = -1 * frame.slabWeight.data[i].Uzp[0] * 10;
          let jzload = -1 * frame.slabWeight.data[i].Uzp[1] * 10;
          geo.vertices.push(nivec,
              new global.THREE.Vector3(nivec.x, nivec.y, nivec.z + izload),
              new global.THREE.Vector3(njvec.x, njvec.y, njvec.z + jzload),
              njvec);
          slabweightGroup.add(new global.THREE.Line(geo, aquaLine));
      }

      for (let i in frame.barrier.data) {
          let geo = new global.THREE.Geometry();
          let ivec = geometry.vertices[elemDict[frame.barrier.data[i].elem][0]];
          let jvec = geometry.vertices[elemDict[frame.barrier.data[i].elem][1]];
          let a = frame.barrier.data[i].RD;
          let nivec = new global.THREE.Vector3(ivec.x * (1 - a) + jvec.x * a, ivec.y * (1 - a) + jvec.y * a, ivec.z * (1 - a) + jvec.z * a);
          let izload = -1 * frame.barrier.data[i].Uz / 10;
          geo.vertices.push(nivec,
              new global.THREE.Vector3(nivec.x, nivec.y, nivec.z + izload));
          barrierGroup.add(new global.THREE.Line(geo, aquaLine));
      }

      for (let i in frame.pavement.data) {
          let geo = new global.THREE.Geometry();
          let ivec = geometry.vertices[elemDict[frame.pavement.data[i].elem][0]];
          let jvec = geometry.vertices[elemDict[frame.pavement.data[i].elem][1]];
          let a = frame.pavement.data[i].RD[0];
          let b = frame.pavement.data[i].RD[1];
          let nivec = new global.THREE.Vector3(ivec.x * (1 - a) + jvec.x * a, ivec.y * (1 - a) + jvec.y * a, ivec.z * (1 - a) + jvec.z * a);
          let njvec = new global.THREE.Vector3(ivec.x * (1 - b) + jvec.x * b, ivec.y * (1 - b) + jvec.y * b, ivec.z * (1 - b) + jvec.z * b);
          let izload = -1 * frame.pavement.data[i].Uzp[0] * 10;
          let jzload = -1 * frame.pavement.data[i].Uzp[1] * 10;
          geo.vertices.push(nivec,
              new global.THREE.Vector3(nivec.x, nivec.y, nivec.z + izload),
              new global.THREE.Vector3(njvec.x, njvec.y, njvec.z + jzload),
              njvec);
          pavementGroup.add(new global.THREE.Line(geo, aquaLine));
      }

      for (let i in frame.laneList) {
          let geo = new global.THREE.Geometry();
          for (let j in frame.laneList[i]) {
              let loadData = frame[frame.laneList[i][j]].data[0];
              let ivec = geometry.vertices[elemDict[loadData.elem][0]];
              let jvec = geometry.vertices[elemDict[loadData.elem][1]];
              let a = loadData.RD;
              let nivec = new global.THREE.Vector3(ivec.x * (1 - a) + jvec.x * a, ivec.y * (1 - a) + jvec.y * a, ivec.z * (1 - a) + jvec.z * a);
              geo.vertices.push(nivec);
          }
          let line = new global.THREE.Line(geo, redDotLine);
          line.computeLineDistances();
          laneGroup.add(line);
      }



      let arrow = 200;
      for (let i in node.boundary.data) {
          // let arrow = new THREE.Group();
          let nodeNum = node.boundary.data[i].nodeNum - 1;
          let vec = geometry.vertices[nodeNum];
          let localData = node.local.data.find(function (elem) { return elem.nodeNum === node.boundary.data[i].nodeNum });
          let geo = new global.THREE.Geometry();
          if (node.boundary.data[i].DOF[0] === false) {
              geo.vertices.push(
                  new global.THREE.Vector3(-1000, 0, 0),
                  new global.THREE.Vector3(1000, 0, 0),
                  new global.THREE.Vector3(-1000, 0, 0),
                  new global.THREE.Vector3(-1000 + arrow, arrow, 0),
                  new global.THREE.Vector3(-1000, 0, 0),
                  new global.THREE.Vector3(-1000 + arrow, -arrow, 0),
                  new global.THREE.Vector3(1000, 0, 0),
                  new global.THREE.Vector3(1000 - arrow, arrow, 0),
                  new global.THREE.Vector3(1000, 0, 0),
                  new global.THREE.Vector3(1000 - arrow, -arrow, 0),
              );
          }
          if (node.boundary.data[i].DOF[1] === false) {
              geo.vertices.push(
                  new global.THREE.Vector3(0, -1000, 0),
                  new global.THREE.Vector3(0, 1000, 0),
                  new global.THREE.Vector3(0, -1000, 0),
                  new global.THREE.Vector3(arrow, -1000 + arrow, 0),
                  new global.THREE.Vector3(0, -1000, 0),
                  new global.THREE.Vector3(-arrow, -1000 + arrow, 0),
                  new global.THREE.Vector3(0, 1000, 0),
                  new global.THREE.Vector3(arrow, 1000 - arrow, 0),
                  new global.THREE.Vector3(0, 1000, 0),
                  new global.THREE.Vector3(-arrow, 1000 - arrow, 0),
              );
          }
          if (node.boundary.data[i].DOF[0] && node.boundary.data[i].DOF[1]) {
              let circle = new global.THREE.CircleGeometry(arrow, 16);
              circle.translate(vec.x, vec.y, vec.z);
              modelGroup.add(new global.THREE.Mesh(circle, circleMaterial));
          }
          geo.rotateZ(localData.ANG * Math.PI / 180);
          geo.translate(vec.x, vec.y, vec.z);
          modelGroup.add(new global.THREE.LineSegments(geo, yellowLine));

          // group.add(arrow)
      }

      return { AnalysisModel: modelGroup, LCselfweight: selfweightGroup, LCslabweight: slabweightGroup, LCbarrier: barrierGroup, LCpavement: pavementGroup }
  }

  function AnalysisResult(node, frame, output, loadCase, forceNum) {
      let group = new global.THREE.Group();
      let geometry = new global.THREE.Geometry(); // 추후에 bufferGeometry로 변경요망
      let initPoint = node.node.data[0].coord;
      let greenLine = new global.THREE.LineBasicMaterial({ color: 0x00ff00 });
      let aquaLine = new global.THREE.LineBasicMaterial({ color: 0x00ffff });
      let yellowLine = new global.THREE.LineBasicMaterial({ color: 0xffff00 });
      let circleMaterial = new global.THREE.MeshBasicMaterial({ color: 0xffff00 });
      let redDotLine = new global.THREE.LineDashedMaterial({ color: 0xff0000, dashSize: 300, gapSize: 100, });
      let redLine = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let elemDict = {};
      let analysisOutput = { "force": [] };
      if (output) {
          analysisOutput = output;
      }

      // console.log("analysisOutput", analysisOutput["force"], loadCase, forceNum)
      for (let i in node.node.data) {
          let pt = new global.THREE.Vector3(
              node.node.data[i].coord[0] - initPoint[0],
              node.node.data[i].coord[1] - initPoint[1],
              node.node.data[i].coord[2] - initPoint[2]);
          geometry.vertices.push(pt);
      }

      for (let i in frame.frame.data) {
          let iNum = frame.frame.data[i].iNode - 1;
          let jNum = frame.frame.data[i].jNode - 1;
          elemDict[frame.frame.data[i].number] = [iNum, jNum];
      }


      // 해석결과 보기 함수
      // test //
      let maxValue = null;
      let minValue = null;

      for (let elemNum in analysisOutput["force"]) {
          for (let seg in analysisOutput["force"][elemNum]) {
              let newValue = analysisOutput["force"][elemNum][seg][loadCase][forceNum];
              if (!maxValue || newValue > maxValue) {
                  maxValue = newValue;
              }
              if (!minValue || newValue < minValue) {
                  minValue = newValue;
              }
          }
      }
      let scaler = 5000 / Math.max(Math.abs(maxValue), Math.abs(minValue));
      for (let elemNum in analysisOutput["force"]) {
          let ivec = geometry.vertices[elemDict[elemNum][0]];
          let jvec = geometry.vertices[elemDict[elemNum][1]];
          let geo = new global.THREE.Geometry();
          for (let seg in analysisOutput["force"][elemNum]) {
              let a = seg * 1;
              let nivec = new global.THREE.Vector3(ivec.x * (1 - a) + jvec.x * a, ivec.y * (1 - a) + jvec.y * a, ivec.z * (1 - a) + jvec.z * a);
              let izload = analysisOutput["force"][elemNum][seg][loadCase][forceNum] * scaler;
              if (seg === "0.00000") {
                  geo.vertices.push(new global.THREE.Vector3(nivec.x, nivec.y, nivec.z));
              }
              geo.vertices.push(new global.THREE.Vector3(nivec.x, nivec.y, nivec.z + izload));
              if (seg === "1.00000") {
                  geo.vertices.push(new global.THREE.Vector3(nivec.x, nivec.y, nivec.z));
              }
              group.add(new global.THREE.Line(geo, redLine));
          }
      }

      // let influenceElem = "16"

      // for (let i in frame.laneList) {
      //     let geo = new THREE.Geometry();
      //     let geo2 = new THREE.Geometry();
      //     for (let j in frame.laneList[i]) {
      //         let loadData = frame[frame.laneList[i][j]].data[0]
      //         let ivec = geometry.vertices[elemDict[loadData.elem][0]]
      //         let jvec = geometry.vertices[elemDict[loadData.elem][1]]
      //         let a = loadData.RD
      //         let izload = analysisOutput.force[influenceElem]["0.00000"][frame.laneList[i][j]][5] * 1000000
      //         let nivec = new THREE.Vector3(ivec.x * (1 - a) + jvec.x * a, ivec.y * (1 - a) + jvec.y * a, ivec.z * (1 - a) + jvec.z * a)
      //         let nivec2 = new THREE.Vector3(nivec.x, nivec.y, nivec.z + izload)
      //         geo.vertices.push(nivec2)
      //         geo2.vertices.push(nivec, nivec2)
      //     }
      //     group.add(new THREE.Line(geo, yellowLine));
      //     group.add(new THREE.LineSegments(geo2, yellowLine));
      // }
      // delete analysisOutput.disp
      // for (let elem in analysisOutput.force) {
      //     if (!frame.girderElemList.includes(elem * 1)) {
      //         delete analysisOutput.force[elem]
      //     }
      // }

      // console.log("newSapOutput", analysisOutput)
      return group
  }

  function LineView(linepoints, initPoint, color) {
      var group = new global.THREE.Group();
      var geometry = new global.THREE.Geometry();
      const xInit = initPoint.x;
      const yInit = initPoint.y;
      const zInit = initPoint.z;
      for (let i = 0; i < linepoints.length; i++) {
          geometry.vertices.push(
              new global.THREE.Vector3(linepoints[i].x - xInit, linepoints[i].y - yInit, linepoints[i].z - zInit));
      }
      var colorCode = color ? color : 0xffff00;  //  : 
      var line = new global.THREE.Line(
          geometry, new global.THREE.LineBasicMaterial({ color: parseInt(colorCode, 16) })
      );
      group.add(line);
      return group
  }

  function LineMesh(linepoints, initPoint, color) {
      let geometry = new global.THREE.Geometry();
      const xInit = initPoint.x;
      const yInit = initPoint.y;
      const zInit = initPoint.z;
      for (let i = 0; i < linepoints.length; i++) {
          geometry.vertices.push(
              new global.THREE.Vector3(linepoints[i].x - xInit, linepoints[i].y - yInit, linepoints[i].z - zInit));
      }
      let colorCode = color ? color : 0xffff00;  //  : 
      let line = new global.THREE.Line(
          geometry, new global.THREE.LineBasicMaterial({ color: parseInt(colorCode, 16) })
      );
      return line
  }


  function SteelBoxView(steelBoxDict, initPoint) {
      let group = new global.THREE.Group();
      // var meshMaterial = new THREE.MeshLambertMaterial( {
      //     color: 0x00ff00,
      //     emissive: 0x44aa44,
      //     opacity: 1,
      //     side:THREE.DoubleSide,
      //     transparent: false,
      //     wireframe : false
      //   } );
      let meshMaterial = new global.THREE.MeshNormalMaterial();
      meshMaterial.side = global.THREE.DoubleSide;
      for (let key in steelBoxDict) {
          if (!key.includes("Side")) {
              steelBoxDict[key]["points"].forEach(function (plist) {
                  if (plist.length > 0) {
                      let geometry = new global.THREE.Geometry();
                      for (let i = 0; i < plist.length; i++) {
                          geometry.vertices.push(new global.THREE.Vector3(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z));
                      }

                      for (let i = 0; i < plist.length / 4 - 1; i++) {
                          for (let j = 0; j < 4; j++) {
                              let k = j + 1 === 4 ? 0 : j + 1;
                              geometry.faces.push(new global.THREE.Face3(i * 4 + j, i * 4 + k, (i + 1) * 4 + j));
                              geometry.faces.push(new global.THREE.Face3(i * 4 + k, (i + 1) * 4 + k, (i + 1) * 4 + j));
                          }
                          if (i === 0) {
                              geometry.faces.push(new global.THREE.Face3(0, 1, 2));
                              geometry.faces.push(new global.THREE.Face3(0, 2, 3));
                          } else if (i === (plist.length / 4 - 2)) {
                              geometry.faces.push(new global.THREE.Face3((i + 1) * 4, (i + 1) * 4 + 1, (i + 1) * 4 + 2));
                              geometry.faces.push(new global.THREE.Face3((i + 1) * 4, (i + 1) * 4 + 2, (i + 1) * 4 + 3));
                          }
                      }

                      geometry.computeFaceNormals();
                      group.add(new global.THREE.Mesh(geometry, meshMaterial));
                  }
              });
          }
      }
      return group
  }

  function DiaView(diaDict, initPoint) {
      var group = new global.THREE.Group();
      // var meshMaterial = new THREE.MeshLambertMaterial( {
      //     color: 0x00ffff,
      //     emissive: 0x44aaaa,
      //     opacity: 1,
      //     side:THREE.DoubleSide,
      //     transparent: false,
      //     wireframe : false
      //   } );
      var boltMaterial = new global.THREE.MeshLambertMaterial({
          color: 0xffffff,
          emissive: 0x000000,
          opacity: 1,
          transparent: false,
          wireframe: false
      });
      var meshMaterial = new global.THREE.MeshNormalMaterial();
      for (let diakey in diaDict) {
          for (let partkey in diaDict[diakey]) {
              if (partkey !== "point") {
                  let shapeNode = diaDict[diakey][partkey].points;
                  let Thickness = diaDict[diakey][partkey].Thickness;
                  let zPosition = diaDict[diakey][partkey].z;
                  let rotationY = diaDict[diakey][partkey].rotationY;
                  let rotationX = diaDict[diakey][partkey].rotationX;
                  let hole = diaDict[diakey][partkey].hole;
                  let point = diaDict[diakey][partkey].point ? diaDict[diakey][partkey].point : diaDict[diakey].point;
                  group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial));
                  if (diaDict[diakey][partkey].bolt) {
                      let Thickness = diaDict[diakey][partkey].Thickness;
                      let zPosition = diaDict[diakey][partkey].z;
                      let rotationY = diaDict[diakey][partkey].rotationY + Math.PI / 2;
                      let rotationX = diaDict[diakey][partkey].rotationX;
                      let point = diaDict[diakey][partkey].point;
                      let bolt = diaDict[diakey][partkey].bolt;
                      // 볼트배치 자동계산 모듈 // 2020.7.7 by drlim
                      let boltZ = bolt.isUpper ? zPosition + Thickness - bolt.l / 2 : zPosition + bolt.l / 2;
                      if (bolt.layout) {
                          for (let i in bolt.layout) {
                              group.add(boltMesh(point, bolt, boltZ, rotationX, rotationY, bolt.layout[i], initPoint, boltMaterial));
                              // dummyList.push(instancedBoltMesh(point, bolt, boltZ, rotationX, rotationY,bolt.layout[i], initPoint))
                          }
                      }
                  }
              }

          }
      }
      return group
  }

  function diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial) {
      var shape = new global.THREE.Shape();
      var shapeNodeVectors = [];
      for (let i = 0; i < shapeNode.length; i++) {
          shapeNodeVectors.push(new global.THREE.Vector2(shapeNode[i].x, shapeNode[i].y));
      }
      shape.setFromPoints(shapeNodeVectors);
      if (hole.length > 0) {
          var holeVectors = [];
          for (let i = 0; i < hole.length; i++) {
              holeVectors.push(new global.THREE.Vector2(hole[i].x, hole[i].y));
          }
          var holeShape = new global.THREE.Shape();
          holeShape.setFromPoints(holeVectors);
          shape.holes.push(holeShape);
      }

      var geometry = new global.THREE.ExtrudeBufferGeometry(shape, { depth: Thickness, steps: 1, bevelEnabled: false });
      var mesh = new global.THREE.Mesh(geometry, meshMaterial);
      var rad = Math.atan2(- point.normalCos, point.normalSin) + Math.PI / 2;  //+ 

      mesh.rotation.set(rotationX, rotationY, 0); //(rotationY - 90)*Math.PI/180
      mesh.rotateOnWorldAxis(new global.THREE.Vector3(0, 0, 1), rad);
      mesh.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z);
      mesh.translateZ(zPosition);
      return mesh
  }

  // export function HBracingPlateView(hBraicngPlateDict, initPoint) {
  //     var group = new THREE.Group();
  //     // var meshMaterial = new THREE.MeshLambertMaterial( {
  //     //     color: 0x00ffff,
  //     //     emissive: 0x44aaaa,
  //     //     opacity: 1,
  //     //     side:THREE.DoubleSide,
  //     //     transparent: false,
  //     //     wireframe : false
  //     //   } );
  //     var meshMaterial = new THREE.MeshNormalMaterial()
  //     for (let pk in hBraicngPlateDict) {
  //         //    let point = pointDict[pk]
  //         for (let partkey in hBraicngPlateDict[pk]) {
  //             if (partkey !== "point") {
  //                 let shapeNode = hBraicngPlateDict[pk][partkey].points
  //                 let Thickness = hBraicngPlateDict[pk][partkey].Thickness
  //                 let zPosition = hBraicngPlateDict[pk][partkey].z
  //                 let rotationY = hBraicngPlateDict[pk][partkey].rotationY
  //                 let rotationX = hBraicngPlateDict[pk][partkey].rotationX
  //                 let hole = hBraicngPlateDict[pk][partkey].hole
  //                 let point = hBraicngPlateDict[pk].point ? hBraicngPlateDict[pk].point : hBraicngPlateDict[pk][partkey].point
  //                 group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial))
  //             }
  //         }
  //     }
  //     return group
  // }

  // export function HBracingView(hBracingDict, initPoint) {
  //     var group = new THREE.Group();
  //     // var meshMaterial = new THREE.MeshLambertMaterial( {
  //     //     color: 0x00ffff,
  //     //     emissive: 0x44aaaa,
  //     //     opacity: 1,
  //     //     side:THREE.DoubleSide,
  //     //     transparent: false,
  //     //     wireframe : false
  //     //   } );
  //     var meshMaterial = new THREE.MeshNormalMaterial()
  //     for (let i in hBracingDict) {
  //         group.add(convexMesh(hBracingDict[i].points[0], initPoint, meshMaterial))
  //         group.add(convexMesh(hBracingDict[i].points[1], initPoint, meshMaterial))
  //     }
  //     return group
  // }

  // export function convexMesh(plist, initPoint, meshMaterial) {
  //     let geometry = new THREE.Geometry();
  //     for (let i in plist) {
  //         geometry.vertices.push(new THREE.Vector3(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z))
  //     }
  //     let j = plist.length / 2
  //     for (let i = 0; i < j; i++) {
  //         let k = i + 1 === j ? 0 : i + 1
  //         geometry.faces.push(new THREE.Face3(k, i, i + j));
  //         geometry.faces.push(new THREE.Face3(k, i + j, k + j));
  //     }
  //     geometry.computeFaceNormals();
  //     return new THREE.Mesh(geometry, meshMaterial)
  // }

  function DeckPointView(deckPointDict, initPoint, opacity) {
      let group = new global.THREE.Group();
      var meshMaterial = new global.THREE.MeshLambertMaterial({
          color: 0x000000,
          emissive: 0x777777,
          opacity: opacity,
          // side: THREE.DoubleSide,
          transparent: true,
          wireframe: false
      });
      // let meshMaterial = new THREE.MeshNormalMaterial()
      //     meshMaterial.side = THREE.DoubleSide
      let pNum = deckPointDict[0].slabUpperPoints.length + deckPointDict[0].slabLowerPoints.length;
      let geometry = new global.THREE.Geometry();
      for (let key in deckPointDict) {
          deckPointDict[key].slabUpperPoints.forEach(function (Point) {
              geometry.vertices.push(new global.THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z));
          });
          deckPointDict[key].slabLowerPoints.reverse().forEach(function (Point) {
              geometry.vertices.push(new global.THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z));
          });
      }


      for (let i = 0; i < deckPointDict.length - 1; i++) {
          for (let j = 0; j < pNum; j++) {
              let k = j === pNum - 1 ? 0 : j + 1;
              geometry.faces.push(new global.THREE.Face3(i * pNum + j, i * pNum + k, (i + 1) * pNum + j));
              geometry.faces.push(new global.THREE.Face3(i * pNum + k, (i + 1) * pNum + k, (i + 1) * pNum + j));
          }
          if (i === 0) {
              // let numList = []
              // for (let i = 0; i < pNum; i++) { numList.push(i) }
              // let br = 0;
              // let v1 = new THREE.Vector3(geometry.vertices[0].x - geometry.vertices[pNum - 1].x, geometry.vertices[0].y - geometry.vertices[pNum - 1].y, geometry.vertices[0].z - geometry.vertices[pNum - 1].z)
              // let v2 = new THREE.Vector3(geometry.vertices[1].x - geometry.vertices[0].x, geometry.vertices[1].y - geometry.vertices[0].y, geometry.vertices[1].z - geometry.vertices[0].z)
              // v1.cross(v2)
              // console.log("check", v1, pNum, numList)
              // geometry.faces.push(new THREE.Face3(pNum - 1, 0, 1));
              // while (numList.length > 2) {
              //     let eraseList = [];
              //     // numList.forEach(num => dummy.push[num])
              //     for (let j = 0; j < numList.length - 2; j += 2) {
              //         let a1 = geometry.vertices[numList[j]];
              //         let a2 = geometry.vertices[numList[j + 1]];
              //         let a3 = geometry.vertices[numList[j + 2]];
              //         let b1 = new THREE.Vector3(a2.x - a1.x, a2.y - a1.y, a2.z - a1.z);
              //         let b2 = new THREE.Vector3(a3.x - a2.x, a3.y - a2.y, a3.z - a2.z);
              //         b1.cross(b2)
              //         console.log("check", b1, b1.length(), v1, v1.length())
              //         if (b1.length() < 10) {
              //             eraseList.push(numList[j + 1])
              //         } else {
              //             let dotp = b1.dot(v1)
              //             if (dotp > 0) {
              //                 geometry.faces.push(new THREE.Face3(numList[j + 2], numList[j + 1], numList[j]));
              //                 eraseList.push(numList[j + 1])
              //             }
              //         }

              //     }
              //     eraseList.forEach(num => numList.splice(numList.indexOf(num), 1))
              //     if (br > 100) { 
              //         console.log("check", br)
              //         break; }
              //     br++;
              // }
              geometry.faces.push(new global.THREE.Face3(0, pNum - 1, 1));
              geometry.faces.push(new global.THREE.Face3(1, 3, 2));
              for (let j = 1; j < pNum - 3; j++) {
                  geometry.faces.push(new global.THREE.Face3(pNum - j, pNum - j - 1, 1));
              }
          }
          else if (i === deckPointDict.length - 2) {
              geometry.faces.push(new global.THREE.Face3((i + 1) * pNum, (i + 1) * pNum + 1, (i + 2) * pNum - 1));
              geometry.faces.push(new global.THREE.Face3((i + 1) * pNum + 1, (i + 1) * pNum + 2, (i + 1) * pNum + 3));
              for (let j = 1; j < pNum - 3; j++) {
                  geometry.faces.push(new global.THREE.Face3((i + 2) * pNum - j, (i + 1) * pNum + 1, (i + 2) * pNum - j - 1));
              }
          }
      }
      geometry.computeFaceNormals();
      group.add(new global.THREE.Mesh(geometry, meshMaterial));

      return group
  }

  function boltView(spliceDict, initPoint) {
      var group = new global.THREE.Group();
      // var meshMaterial = new THREE.MeshNormalMaterial()
      var meshMaterial = new global.THREE.MeshLambertMaterial({
          color: 0xffffff,
          emissive: 0x000000,
          opacity: 1,
          side: global.THREE.DoubleSide,
          transparent: false,
          wireframe: false
      });
      let boltIs = false;
      // let bolt0 = { startPoint: { x: 800, y: 150 }, P: 100, G: 100, pNum: 4, gNum: 17, size: 37, t: 14, l: 54 }
      // var radius = bolt0.size/2
      // var geometry = new THREE.CylinderBufferGeometry(radius,radius,bolt0.t*2+bolt0.l,6,1)
      // let dummyList = [];
      // for (let key in spliceDict) {
      //    let point = nameToPointDict[diakey]
      for (let partkey in spliceDict) {
          if (spliceDict[partkey].bolt) {
              let Thickness = spliceDict[partkey].Thickness;
              let zPosition = spliceDict[partkey].z;
              let rotationY = spliceDict[partkey].rotationY + Math.PI / 2;
              let rotationX = spliceDict[partkey].rotationX;
              let point = spliceDict[partkey].point;
              let bolt = spliceDict[partkey].bolt;
              // 볼트배치 자동계산 모듈 // 2020.7.7 by drlim
              let boltZ = bolt.isUpper ? zPosition + Thickness - bolt.l / 2 : zPosition + bolt.l / 2;
              if (bolt.layout) {
                  for (let i in bolt.layout) {
                      group.add(boltMesh(point, bolt, boltZ, rotationX, rotationY, bolt.layout[i], initPoint, meshMaterial));
                      // dummyList.push(instancedBoltMesh(point, bolt, boltZ, rotationX, rotationY,bolt.layout[i], initPoint))
                  }
                  boltIs = true;
              }
          }
      }
      // }
      // console.log("dummyList",dummyList)
      // let mesh = new THREE.InstancedMesh(geometry, meshMaterial,dummyList.length)
      // mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
      // for (let i in dummyList){
      //     mesh.setMatrixAt(i,dummyList[i].matrix)
      // }
      // mesh.instanceMatrix.needsUpdate = true;
      // group.add(mesh)
      let result = boltIs ? group : null;
      return result
  }

  function boltMesh(point, bolt, zPosition, rotationX, rotationY, XYtranslate, initPoint, meshMaterial) {
      var radius = bolt.size / 2;
      var geometry = new global.THREE.CylinderBufferGeometry(radius, radius, bolt.t * 2 + bolt.l, 6, 1);
      var mesh = new global.THREE.Mesh(geometry, meshMaterial);
      var rad = Math.atan2(- point.normalCos, point.normalSin) + Math.PI / 2;  //+ 
      mesh.rotation.set(rotationX, rotationY, Math.PI / 2); //(rotationY - 90)*Math.PI/180
      mesh.rotateOnWorldAxis(new global.THREE.Vector3(0, 0, 1), rad);
      mesh.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z);
      mesh.translateY(zPosition);
      mesh.translateX(XYtranslate[1]);
      mesh.translateZ(XYtranslate[0]);
      return mesh
  }

  function StudMeshView(studList, initPoint) {
      let group = new global.THREE.Group();
      var meshMaterial = new global.THREE.MeshNormalMaterial();
      // var meshMaterial = new THREE.MeshLambertMaterial( {
      //     color: 0xffffff,
      //     emissive: 0x000000,
      //     opacity: 1,
      //     side:THREE.DoubleSide,
      //     transparent: false,
      //     wireframe : false
      // } );
      for (let i in studList) {
          var geometry = new global.THREE.CylinderBufferGeometry(studList[i].stud.dia / 2, studList[i].stud.dia / 2, studList[i].stud.height, 8, 1);
          var geometry2 = new global.THREE.CylinderBufferGeometry(studList[i].stud.headDia / 2, studList[i].stud.headDia / 2, studList[i].stud.headDepth, 8, 1);
          let rotationX = Math.atan(studList[i].gradientX);
          let rotationY = Math.atan(studList[i].gradientY);
          let instanceList = [];
          let instanceList2 = [];
          for (let j in studList[i].points) {
              let point = studList[i].points[j];
              // instance mesh test
              let dummy = new global.THREE.Object3D();
              let dummy2 = new global.THREE.Object3D();
              dummy.rotation.set(rotationX + Math.PI / 2, rotationY, 0);
              dummy.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z);
              dummy.translateY(studList[i].stud.height / 2);
              dummy2.rotation.set(rotationX + Math.PI / 2, rotationY, 0);
              dummy2.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z);
              dummy2.translateY(studList[i].stud.height - studList[i].stud.headDepth / 2);
              dummy.updateMatrix();
              dummy2.updateMatrix();
              instanceList.push(dummy);
              instanceList2.push(dummy2);

              // instance mesh test
              // var mesh = new THREE.Mesh(geometry, meshMaterial)
              // var mesh2 = new THREE.Mesh(geometry2, meshMaterial)
              // mesh.rotation.set(rotationX + Math.PI / 2, rotationY, 0)
              // mesh.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z)
              // mesh.translateY(studList[i].stud.height / 2)
              // mesh2.rotation.set(rotationX + Math.PI / 2, rotationY, 0)
              // mesh2.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z)
              // mesh2.translateY(studList[i].stud.height - studList[i].stud.headDepth / 2)
              // group.add(mesh)
              // group.add(mesh2)
              // }

          }
          let mesh = new global.THREE.InstancedMesh(geometry, meshMaterial, instanceList.length);
          let mesh2 = new global.THREE.InstancedMesh(geometry2, meshMaterial, instanceList2.length);
          mesh.instanceMatrix.setUsage(global.THREE.DynamicDrawUsage);
          mesh2.instanceMatrix.setUsage(global.THREE.DynamicDrawUsage);
          for (let i in instanceList) {
              mesh.setMatrixAt(i, instanceList[i].matrix);
          }
          for (let i in instanceList2) {
              mesh2.setMatrixAt(i, instanceList2[i].matrix);
          }
          mesh.instanceMatrix.needsUpdate = true;
          mesh2.instanceMatrix.needsUpdate = true;
          group.add(mesh);
          group.add(mesh2);
      }
      return group
  }

  function barrierSectionView(deckSection, initPoint, opacity) {
      let group = new global.THREE.Group();
      var meshMaterial = new global.THREE.MeshLambertMaterial({
          color: 0x000000,
          emissive: 0x777777,
          opacity: opacity,
          // side:THREE.DoubleSide,
          transparent: true,
          wireframe: false
      });
      // let meshMaterial = new THREE.MeshNormalMaterial()
      //     meshMaterial.side = THREE.DoubleSide

      let pNum = deckSection[0].points.length;
      let geometry = new global.THREE.Geometry();
      for (let key in deckSection) {
          deckSection[key].points.forEach(function (Point) {
              geometry.vertices.push(new global.THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z));
          });
      }

      for (let i = 0; i < deckSection.length - 1; i++) {
          for (let j = 0; j < pNum - 1; j++) {
              geometry.faces.push(new global.THREE.Face3(i * pNum + j, (i + 1) * pNum + j, i * pNum + j + 1));
              geometry.faces.push(new global.THREE.Face3(i * pNum + j + 1, (i + 1) * pNum + j, (i + 1) * pNum + j + 1));
          }
          if (i === 0) {
              for (let j = 1; j < pNum - 1; j++) {
                  geometry.faces.push(new global.THREE.Face3(i, i + j, i + j + 1));
              }
          } else if (i === deckSection.length - 2) {
              for (let j = 1; j < pNum - 1; j++) {
                  geometry.faces.push(new global.THREE.Face3((i + 1) * pNum, (i + 1) * pNum + j + 1, (i + 1) * pNum + j));
              }
          }
      }
      geometry.computeFaceNormals();
      group.add(new global.THREE.Mesh(geometry, meshMaterial));
      return group
  }


  function LoftModelView(model, initPoint) {
      let group = new global.THREE.Group();
      let meshMaterial = new global.THREE.MeshNormalMaterial();
      meshMaterial.side = global.THREE.DoubleSide;

      let pNum = model.points[0].length;
      let geometry = new global.THREE.Geometry();
      for (let i in model.points) {
          model.points[i].forEach(function (Point) {
              geometry.vertices.push(new global.THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z));
          });
      }

      for (let i = 0; i < model.points.length - 1; i++) {
          for (let j = 0; j < pNum; j++) {
              let k = j < pNum - 1 ? j + 1 : 0;
              geometry.faces.push(new global.THREE.Face3(i * pNum + j, (i + 1) * pNum + j, i * pNum + k));
              geometry.faces.push(new global.THREE.Face3(i * pNum + k, (i + 1) * pNum + j, (i + 1) * pNum + k));
          }
          if (model.ptGroup) {
              if (i === 0) {
                  for (let g in model.ptGroup) {
                      for (let j = 1; j < model.ptGroup[g].length - 1; j++) {
                          geometry.faces.push(new global.THREE.Face3(model.ptGroup[g][0], model.ptGroup[g][j], model.ptGroup[g][j + 1]));
                      }
                  }
              }
              if (i === model.points.length - 2) {
                  for (let g in model.ptGroup) {
                      for (let j = 1; j < model.ptGroup[g].length - 1; j++) {
                          geometry.faces.push(new global.THREE.Face3((i + 1) * pNum + model.ptGroup[g][0],
                              (i + 1) * pNum + model.ptGroup[g][j + 1], (i + 1) * pNum + model.ptGroup[g][j]));
                      }
                  }
              }
          } else {
              if (i === 0) {
                  for (let j = 1; j < pNum - 1; j++) {
                      geometry.faces.push(new global.THREE.Face3(i, i + j, i + j + 1));
                  }
              }
              if (i === model.points.length - 2) {
                  for (let j = 1; j < pNum - 1; j++) {
                      geometry.faces.push(new global.THREE.Face3((i + 1) * pNum, (i + 1) * pNum + j + 1, (i + 1) * pNum + j));
                  }
              }
          }
      }
      geometry.computeFaceNormals();
      group.add(new global.THREE.Mesh(geometry, meshMaterial));
      return group
  }

  function LineViewer() {
    this.addInput("points", "points");
    this.addInput("initPoint", "point");
    this.addInput("color", "string");
  }
  LineViewer.prototype.onExecute = function () {
  };

  LineViewer.prototype.on3DExecute = function () {
    const points = this.getInputData(0);
    const initPoint = this.getInputData(1) ? this.getInputData(1) : points[0];
    const color = this.getInputData(2);
    // console.log(this.getInputData(1) ? true : false)
    // console.log(initPoint, color)
    let mesh = LineView(points, initPoint, color);
    global.sceneAdder({name:"line", layer:2, mesh:mesh, meta:{part:"line"}});

    // sceneAdder({ layer: 2, mesh: mesh }, "line");
    // sceneAdder(mesh, [2, "line","total"])
  };

  function SteelPlateView() {
    this.addInput("steelBoxDict", "steelBoxDict");
    this.addInput("Point", "Point");
  }

  SteelPlateView.prototype.onExecute = function () {
    const steeBoxDict = this.getInputData(0);
    const initPoint = this.getInputData(1);
    const group = SteelBoxView(steeBoxDict, initPoint);
    global.sceneAdder({name:"steelbox", layer:0, mesh:group, meta:{part:"steelbox"}});

    // sceneAdder({ layer: 0, mesh: group }, "steelbox");
    // sceneAdder(group, [0, "steelBox","total"])
  };

  function DiaPhragmView() {
    this.addInput("diaDict", "diaDict");
    this.addInput("Point", "Point");
    this.addInput("keyName", "string");
  }

  DiaPhragmView.prototype.onExecute = function () {
    const diaDict = this.getInputData(0);
    const initPoint = this.getInputData(1);
    const keyName = this.getInputData(2);
    const group = DiaView(diaDict, initPoint);
    // let n = Math.random().toFixed(5)
    // console.log("random", n)
    global.sceneAdder({name:`${keyName}`, layer:0, mesh:group, meta:{part:`${keyName}`}});

    // sceneAdder({ layer: 0, mesh: group }, keyName);
    // sceneAdder(group, [0, "Part", keyName])
  };

  // export function HorBracingView() {
  //   this.addInput("hBracingDict", "hBracingDict");
  //   this.addInput("Point", "Point");
  // }

  // HorBracingView.prototype.onExecute = function () {
  //   const hb = this.getInputData(0);
  //   const initPoint = this.getInputData(1);
  //   const group = HBracingView(hb.hBracingDict, initPoint);
  //   const group2 = HBracingPlateView(hb.hBracingPlateDict, initPoint);
  //   sceneAdder({name:"hbracing", layer:0, mesh:group, meta:{part:"hbracing"}});
  //   sceneAdder({name:"hbracingPlate", layer:0, mesh:group2, meta:{part:"hbracingPlate"}});

  //   // sceneAdder({ layer: 0, mesh: group }, "hbracing");
  //   // sceneAdder({ layer: 0, mesh: group2 }, "hbracingPlate");
  //   // sceneAdder(group, [0, "HBracing", "Bracing"])
  //   // sceneAdder(group2, [0, "HBracing", "Plate"])
  // }

  function DeckView() {
    this.addInput("deckPointDict", "deckPointDict");
    this.addInput("Point", "Point");
    this.addInput("opacity", "number");
  }

  DeckView.prototype.onExecute = function () {
    global.sceneAdder({name:"deck", layer:0, mesh:DeckPointView(this.getInputData(0), this.getInputData(1), this.getInputData(2)), meta:{part:"deck"}});
    // sceneAdder({
    //   layer: 0,
    //   mesh: DeckPointView(this.getInputData(0), this.getInputData(1), this.getInputData(2))
    // }, "deck");
    // sceneAdder(DeckPointView(this.getInputData(0),this.getInputData(1),this.getInputData(2)), [0, "deck", "total"]); 
  };

  function SpliceBoltView() {
    this.addInput("spliceDict", "diaDict");
    this.addInput("Point", "Point");
  }

  SpliceBoltView.prototype.onExecute = function () {
    // sceneAdder({ layer: 0, 
    //     mesh: boltView(this.getInputData(0),this.getInputData(1))
    // },"bolt"); 
    for (let key in this.getInputData(0)) {
      let boltMesh = boltView(this.getInputData(0)[key], this.getInputData(1));
      if (boltMesh) {
        global.sceneAdder({name:`bolt${key}`, layer:0, mesh:boltMesh, meta:{part:"bolt"}});
        // boltMesh.userData["element"] = "bolt"
        // sceneAdder({ layer: 0, mesh: boltMesh }, "bolt" + key);
        // sceneAdder(boltMesh, [0, "bolt", key]);
      }
    }
  };

  function StudView() {
    this.addInput("studList", "studList");
    this.addInput("Point", "Point");
  }

  StudView.prototype.onExecute = function () {
    global.sceneAdder({name:"stud", layer:0, mesh:StudMeshView(this.getInputData(0), this.getInputData(1)), meta:{part:"stud"}});

    // sceneAdder({
    //   layer: 0,
    //   mesh: StudMeshView(this.getInputData(0), this.getInputData(1))
    // }, "stud");
    // sceneAdder( StudMeshView(this.getInputData(0),this.getInputData(1)), [0, "stud", "total"]); 
  };

  function BarrierView() {
    this.addInput("deckPointDict", "deckPointDict");
    this.addInput("Point", "Point");
    this.addInput("opacity", "number");
  }

  BarrierView.prototype.onExecute = function () {
    const decPoint = this.getInputData(0);
    for (let key in decPoint) {
      let tmpMesh = barrierSectionView(decPoint[key], this.getInputData(1), this.getInputData(2));
      global.sceneAdder({name:`Barrier${key}`, layer:0, mesh:tmpMesh, meta:{part:"Barrier"}});

      // tmpMesh.userData["element"] = "Barrier"
      // sceneAdder({
      //   layer: 0,
      //   mesh: tmpMesh
      // }, "Barrier" + key);
      // sceneAdder( BarrierPointView(decPoint[key],this.getInputData(1),this.getInputData(2)), [0, "Barrier", key]);
    }
  };

  function LoftView() {
    this.addInput("model", "model");
    this.addInput("Point", "Point");
    this.addInput("PartName", "string");
  }

  LoftView.prototype.onExecute = function () {
    const model = this.getInputData(0);
    for (let key in model) {
      let tmpMesh = LoftModelView(model[key], this.getInputData(1));
      global.sceneAdder({name:this.getInputData(2) + key, layer:0, mesh:tmpMesh, meta:{part:this.getInputData(2)}});
    }
  };


  function RebarView() {
    this.addInput("deckRebar", "deckRebar");
    this.addInput("Point", "Point");
  }

  RebarView.prototype.onExecute = function () {
    const deckRebar = this.getInputData(0);
    let group1 = new global.THREE.Group();
    let group2 = new global.THREE.Group();

    for (let i in deckRebar.r1) {
      group1.add(LineMesh(deckRebar.r1[i], this.getInputData(1), 0xff00ff));
      // sceneAdder(LineView(deckRebar.r1[i], this.getInputData(1),0xff00ff), [0, "rebar1", i])
    }
    for (let i in deckRebar.r2) {
      group2.add(LineMesh(deckRebar.r2[i], this.getInputData(1), 0x00ff00));
      // sceneAdder(LineView(deckRebar.r2[i], this.getInputData(1),0x00ff00), [0, "rebar2", i])
    }
    global.sceneAdder({name:"rebar1", layer:0, mesh:group1, meta:{part:"rebar"}});
    global.sceneAdder({name:"rebar2", layer:0, mesh:group2, meta:{part:"rebar"}});

    // sceneAdder({ layer: 0, mesh: group1 }, "rebar1")
    // sceneAdder({ layer: 0, mesh: group2 }, "rebar2")

  };




  function InitPoint() {
    this.addInput("gridPoint", "gridPoint");
    this.addOutput("Point", "Point");
  }

  InitPoint.prototype.onExecute = function () {
    this.getInputData(0);
    this.setOutputData(0, this.getInputData(0)["G1S1"]);
  };


  function AnalysisView() {
    this.addInput("nodeInput", "nodeInput");
    this.addInput("frameInput", "frameInput");
    // this.addOutput("temOut", "temOut");
  }

  AnalysisView.prototype.onExecute = function () {
    let result = AnalysisModel(this.getInputData(0),this.getInputData(1));
    for (let key in result){
    global.sceneAdder({name:key, layer:2, mesh:result[key], meta:{part:key}});
    }
    // sceneAdder({ layer : 2, mesh : result}, "analysisModel");
    // sceneAdder(AnalysisModel(this.getInputData(0),this.getInputData(1)),[2, "analysis", "total"]);
    // this.setOutputData(0, result.analysisOutput)
  };

  function AnalysisResultView() {
    this.addInput("nodeInput", "nodeInput");
    this.addInput("frameInput", "frameInput");
    this.addInput("femResult", "object");
    this.addInput("loadCase", "string");
    this.addInput("forceNum", "number");
  }

  AnalysisResultView.prototype.onExecute = function () {
    let result = AnalysisResult(this.getInputData(0),this.getInputData(1),this.getInputData(2),this.getInputData(3),this.getInputData(4));
    global.sceneAdder({name:`Result${this.getInputData(3)}${this.getInputData(4)}`, layer:2, mesh:result, meta:{part:`Result${this.getInputData(3)}${this.getInputData(4)}`}});

    // sceneAdder({ layer : 2, mesh : result}, "Result" + this.getInputData(3) + this.getInputData(4));
    // sceneAdder(AnalysisModel(this.getInputData(0),this.getInputData(1)),[2, "analysis", "total"]);
    // this.setOutputData(0, result.analysisOutput)
  };

  // import makerjs from 'makerjs'

  function GirderLayoutView(girderLayout) { //종단/평면선형에서의 거더 배치 뷰
      let scale = 0.01; // scale 은 추후 외부에서 받아오는 변수로 지정할 계획임
      let group = new global.THREE.Group();
      let skewLength = 5000;
      let aquaLine = new global.THREE.LineBasicMaterial({ color: 0x00ffff });
      let redLine = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let redDotLine = new global.THREE.LineDashedMaterial({ color: 0xff0000, dashSize: 30, gapSize: 10, });
      let textMaterial = new global.THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff
      let leftLine = [];
      let rightLine = [];
      let label = [];
      let fontSize = 80;
      let initPoint = { x: girderLayout.masterLine.HorizonDataList[0][0], y: girderLayout.masterLine.HorizonDataList[0][1] };
      let layerNum = 3;
      let sign = - 1;
      for (let key in girderLayout.gridKeyPoint) {
          let pt = girderLayout.gridKeyPoint[key];
          let angle = (girderLayout.gridKeyPoint[key].skew - 90) * Math.PI / 180;
          let pt1 = {
              x: pt.x + (pt.normalCos * Math.cos(angle) - pt.normalSin * Math.sin(angle)) * skewLength / Math.cos(angle),
              y: pt.y + (pt.normalCos * Math.sin(angle) + pt.normalSin * Math.cos(angle)) * skewLength / Math.cos(angle)
          };
          let pt2 = {
              x: pt.x - (pt.normalCos * Math.cos(angle) - pt.normalSin * Math.sin(angle)) * skewLength / Math.cos(angle),
              y: pt.y - (pt.normalCos * Math.sin(angle) + pt.normalSin * Math.cos(angle)) * skewLength / Math.cos(angle)
          };
          let bar = [{ x: (pt1.x - initPoint.x) * scale, y: (pt1.y - initPoint.y) * scale },
          { x: (pt2.x - initPoint.x) * scale, y: (pt2.y - initPoint.y) * scale }];

          let rot = Math.atan2(pt.normalSin, pt.normalCos);
          if (rot >= Math.PI / 2) { rot = rot - Math.PI; }
          sign = sign === 1 ? -1 : 1;
          let cos = Math.cos(rot);
          let sin = Math.sin(rot);
          let dimLine = [{ x: (pt.x - initPoint.x) * scale, y: (pt.y - initPoint.y) * scale },
          { x: (pt.x - initPoint.x) * scale + sign * cos * fontSize * 2 - sin * fontSize * 2, y: (pt.y - initPoint.y) * scale + sign * sin * fontSize * 2 + cos * fontSize * 2 },
          { x: (pt.x - initPoint.x) * scale + sign * cos * fontSize * 8 - sin * fontSize * 2, y: (pt.y - initPoint.y) * scale + sign * sin * fontSize * 8 + cos * fontSize * 2 }];
          let station = pt.masterStationNumber;
          label.push({
              text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
              anchor: [(pt.x - initPoint.x) * scale + sign * cos * fontSize * 5 - sin * fontSize * 2.25, (pt.y - initPoint.y) * scale + sign * sin * fontSize * 5 + cos * fontSize * 2.25, 0],
              rotation: rot,
              align: "center",
              fontSize: fontSize / 4
          });

          label.push({
              text: "x:" + (pt.x / 1000).toFixed(4) + ", y:" + (pt.y / 1000).toFixed(4),
              anchor: [(pt.x - initPoint.x) * scale + sign * cos * fontSize * 5 - sin * fontSize * 1.75, (pt.y - initPoint.y) * scale + sign * sin * fontSize * 5 + cos * fontSize * 1.75, 0],
              rotation: rot,
              align: "center",
              fontSize: fontSize / 4
          });

          leftLine.push(bar[0]);
          rightLine.push(bar[1]);
          group.add(LineMesh$1(dimLine, redLine));
          group.add(LineMesh$1(bar, aquaLine));
      }
      for (let i in girderLayout.girderLine) {
          let girderLine = [];
          for (let j in girderLayout.girderLine[i]) {
              girderLine.push({
                  x: (girderLayout.girderLine[i][j].x - initPoint.x) * scale,
                  y: (girderLayout.girderLine[i][j].y - initPoint.y) * scale
              });
          }
          group.add(LineMesh$1(girderLine, redDotLine, -1));
      }
      group.add(LineMesh$1(leftLine, aquaLine));
      group.add(LineMesh$1(rightLine, aquaLine));
      group.add(LabelInsert(label, textMaterial, layerNum));  //layer number is 3

      let group2 = new global.THREE.Group();
      let vl = girderLayout.masterLine.VerticalDataList;
      initPoint = { x: vl[0][0], y: vl[0][1] };
      let xscale = 0.003;//종단선형뷰하고 동일한 스케일을 유지하도록
      let yscale = 0.02;
      let topLine = [];
      let botLine = [];
      for (let key in girderLayout.gridKeyPoint) {
          let pt = girderLayout.gridKeyPoint[key];
          let pt1 = {
              x: (pt.masterStationNumber - initPoint.x) * xscale,
              y: (pt.z - initPoint.y) * yscale + fontSize / 4
          };
          let pt2 = {
              x: (pt.masterStationNumber - initPoint.x) * xscale,
              y: (pt.z - initPoint.y) * yscale - fontSize / 4
          };
          group2.add(LineMesh$1([pt1, pt2], aquaLine));
          topLine.push(pt1);
          botLine.push(pt2);
      }
      group2.add(LineMesh$1(topLine, aquaLine));
      group2.add(LineMesh$1(botLine, aquaLine));

      return { plan: group, side: group2 }
  }

  function LineSideView(masterLine) {  //종단선형뷰
      let xscale = 0.003;
      let yscale = 0.02;
      let fontSize = 80;
      let layerNum = 4;
      let group = new global.THREE.Group();
      let redLine = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let blueLine = new global.THREE.LineBasicMaterial({ color: 0x0000ff });
      let greenLine = new global.THREE.LineBasicMaterial({ color: 0x00ff00 });
      let whiteLine = new global.THREE.LineBasicMaterial({ color: 0xffffff });
      let grayLine = new global.THREE.LineBasicMaterial({ color: 0x888888 });
      let textMaterial = new global.THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff

      let vl = masterLine.VerticalDataList;
      let points = [];
      let linePoints = [];
      let label = [];
      let initPoint = { x: vl[0][0], y: vl[0][1] };
      let leftGrad = [];
      let rightGrad = [];

      for (let i in masterLine.points) {
          linePoints.push({ x: (masterLine.points[i].masterStationNumber - initPoint.x) * xscale, y: (masterLine.points[i].z - initPoint.y) * yscale });
      }
      for (let i in vl) {
          let x = (vl[i][0] - initPoint.x) * xscale;
          let y = (vl[i][1] - initPoint.y) * yscale;
          points.push({ x, y });
          let bar = [{ x, y },
          { x, y: -5 * fontSize }];
          group.add(LineMesh$1(bar, redLine));
          let station = vl[i][0];
          label.push({
              text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
              anchor: [x - fontSize / 4, - 5 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });
          let el = vl[i][1] / 1000;
          label.push({
              text: "EL. " + el.toFixed(4),
              anchor: [x + fontSize / 4, - 5 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });

      }
      for (let i in masterLine.parabolaData) {
          let x1 = (masterLine.parabolaData[i][0] - initPoint.x) * xscale;
          let x2 = (masterLine.parabolaData[i][1] - initPoint.x) * xscale;
          let y1 = (masterLine.parabolaData[i][2] - initPoint.y) * yscale;
          let y2 = (masterLine.parabolaData[i][3] - initPoint.y) * yscale;
          group.add(LineMesh$1([{ x: x1, y: y1 }, { x: x1, y: - 5 * fontSize }, { x: x2, y: - 5 * fontSize }, { x: x2, y: y2 }], blueLine));
          label.push({
              text: "L=" + (masterLine.parabolaData[i][4] / 1000).toFixed(4),
              anchor: [(x1 + x2) / 2, - 5.25 * fontSize, 0],
              rotation: 0,
              align: "center",
              fontSize: fontSize / 4
          });
          let station = masterLine.parabolaData[i][0];
          label.push({
              text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
              anchor: [x1 - fontSize / 4, - 5 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });
          let el = masterLine.parabolaData[i][2] / 1000;
          label.push({
              text: "EL. " + el.toFixed(4),
              anchor: [x1 + fontSize / 4, - 5 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });
          station = masterLine.parabolaData[i][1];
          label.push({
              text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
              anchor: [x2 - fontSize / 4, - 5 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });
          el = masterLine.parabolaData[i][3] / 1000;
          label.push({
              text: "EL. " + el.toFixed(4),
              anchor: [x2 + fontSize / 4, - 5 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });

      }

      for (let i = 0; i < masterLine.tangent.length; i++) {
          let x = ((vl[i][0] + vl[i + 1][0]) / 2 - initPoint.x) * xscale;
          let y = ((vl[i][1] + vl[i + 1][1]) / 2 - initPoint.y) * yscale;
          let rot = Math.atan(masterLine.tangent[i]) * yscale / xscale;
          label.push({
              text: "S=" + (masterLine.tangent[i] * 100).toFixed(2) + "%",
              anchor: [x, y + 0.25 * fontSize, 0],
              rotation: rot,
              align: "center",
              fontSize: fontSize / 4
          });
      }

      let offset = -15 * fontSize;
      let superElCenter = [];
      for (let i in masterLine.SuperElevation) {
          let x = (masterLine.SuperElevation[i][0] - initPoint.x) * xscale;
          let y = offset;
          group.add(LineMesh$1([{ x, y: y + 5 * fontSize }, { x, y: y - 8 * fontSize }], redLine));
          superElCenter.push({ x, y });
          leftGrad.push({ x, y: y + fontSize / 2 * masterLine.SuperElevation[i][1] });
          rightGrad.push({ x, y: y + fontSize / 2 * masterLine.SuperElevation[i][2] });
          let station = masterLine.SuperElevation[i][0];
          label.push({
              text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
              anchor: [x - fontSize / 4, y - 8 * fontSize, 0],
              rotation: Math.PI / 2,
              align: "left",
              fontSize: fontSize / 4
          });
      }
      for (let i = 0; i < 11; i++) {
          group.add(LineMesh$1([{ x: superElCenter[0].x, y: offset + (5 - i) * fontSize }, { x: superElCenter[superElCenter.length - 1].x, y: offset + (5 - i) * fontSize }], grayLine));
          label.push({
              text: (10 - i * 2).toFixed(0) + "%",
              anchor: [superElCenter[0].x - fontSize, offset + (5 - i) * fontSize, 0],
              rotation: 0,
              align: "center",
              fontSize: fontSize / 4
          });
      }
      group.add(LineMesh$1(superElCenter, redLine));
      group.add(LineMesh$1(leftGrad, blueLine, 1));
      group.add(LineMesh$1(rightGrad, greenLine, 1));
      group.add(LineMesh$1(linePoints, whiteLine, 1));
      group.add(LineMesh$1(points, blueLine));
      group.add(LabelInsert(label, textMaterial, layerNum));  //layer number is 3

      return group
  }

  function LineDrawView(masterLine, slaveLines) {  //평면선형 그리기
      let scale = 0.01;
      let group = new global.THREE.Group();
      let IPpoints = [];
      let linePoints = [];
      let label = [];
      let redLine = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let blueLine = new global.THREE.LineBasicMaterial({ color: 0x0000ff });
      let whiteLine = new global.THREE.LineBasicMaterial({ color: 0xffffff });
      let textMaterial = new global.THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff
      let fontSize = 80;
      let segName = { 0: "ETC", 1: "BTC", 2: "BC", 3: "EC" };

      let initPoint = { x: masterLine.HorizonDataList[0][0], y: masterLine.HorizonDataList[0][1] };
      for (let i in masterLine.HorizonDataList) {
          IPpoints.push({ x: (masterLine.HorizonDataList[i][0] - initPoint.x) * scale, y: (masterLine.HorizonDataList[i][1] - initPoint.y) * scale });
      }
      for (let i in masterLine.points) {
          let station = masterLine.points[i].masterStationNumber / 1000;
          if ((station % 20).toFixed(0) === "0") {
              linePoints.push({ x: (masterLine.points[i].x - initPoint.x) * scale, y: (masterLine.points[i].y - initPoint.y) * scale });
              let rot = Math.atan2(masterLine.points[i].normalSin, masterLine.points[i].normalCos);
              if (rot >= Math.PI / 2) { rot = rot - Math.PI; }
              let cos = Math.cos(rot);
              let sin = Math.sin(rot);
              let bar = [{ x: (masterLine.points[i].x - initPoint.x) * scale + cos * fontSize / 4, y: (masterLine.points[i].y - initPoint.y) * scale + sin * fontSize / 4 },
              { x: (masterLine.points[i].x - initPoint.x) * scale - cos * fontSize / 4, y: (masterLine.points[i].y - initPoint.y) * scale - sin * fontSize / 4 }];
              group.add(LineMesh$1(bar, whiteLine));
              label.push({
                  text: (masterLine.points[i].masterStationNumber / 1000).toFixed(4),
                  anchor: [bar[0].x + cos * fontSize / 4, bar[0].y + sin * fontSize / 4, 0],
                  rotation: rot,
                  align: "left",
                  fontSize: fontSize / 4
              });
          }
      }

      for (let i = 1; i < masterLine.segments.start.length; i++) {
          let station = masterLine.segments.start[i];
          let pt = PointGenerator(station, masterLine, 90);
          let rot = Math.atan2(pt.normalSin, pt.normalCos);
          if (rot >= Math.PI / 2) { rot = rot - Math.PI; }
          let cos = Math.cos(rot);
          let sin = Math.sin(rot);
          let bar = [{ x: (pt.x - initPoint.x) * scale + cos * fontSize * 6, y: (pt.y - initPoint.y) * scale + sin * fontSize * 6 },
          { x: (pt.x - initPoint.x) * scale, y: (pt.y - initPoint.y) * scale }];
          group.add(LineMesh$1(bar, redLine));
          label.push({
              text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
              anchor: [bar[1].x + cos * fontSize * 4 + sin * fontSize / 4, bar[1].y + sin * fontSize * 4 - cos * fontSize / 4, 0],
              rotation: rot,
              align: "center",
              fontSize: fontSize / 4
          });
          label.push({
              text: segName[i % 4],
              anchor: [bar[1].x + cos * fontSize * 4 - sin * fontSize / 4, bar[1].y + sin * fontSize * 4 + cos * fontSize / 4, 0],
              rotation: rot,
              align: "center",
              fontSize: fontSize / 4
          });

      }


      for (let i = 0; i < IPpoints.length; i++) {
          let circle = new global.THREE.EllipseCurve(IPpoints[i].x, IPpoints[i].y, 20, 20);
          let cp = circle.getPoints(16);
          let circlegeo = new global.THREE.Geometry().setFromPoints(cp);
          let IPCircle = new global.THREE.Line(circlegeo, redLine);
          group.add(IPCircle);
          let ipName = i === 0 ? "BP" : i === (IPpoints.length - 1) ? "EP" : "IP" + i;
          label.push({
              text: ipName,
              anchor: [IPpoints[i].x, IPpoints[i].y + 100, 0],
              rotation: 0,
              fontSize: fontSize
          });

      }
      group.add(LineMesh$1(linePoints, whiteLine));
      group.add(LineMesh$1(IPpoints, blueLine));
      group.add(LabelInsert(label, textMaterial, 3));  //layer number is 3

      return group
  }

  function LabelInsert(label, textMaterial, layer) {
      let group = new global.THREE.Group();
      var loader = new global.THREE.FontLoader();
      loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
          // loader.load('fonts/noto_sans_kr_regular.json', function (font) {
          // console.log(font)
          // var font = {generateShapes:(messagem , num)=>{}}
          for (let i in label) {
              var shapes = font.generateShapes(label[i].text, label[i].fontSize);
              var geometry = new global.THREE.ShapeBufferGeometry(shapes);
              if (label[i].align === "left") {
                  geometry.translate(0, -label[i].fontSize / 2, 0);
              }
              else {
                  var xMid;
                  geometry.computeBoundingBox();
                  xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
                  geometry.translate(xMid, -label[i].fontSize / 2, 0);
              }

              if (label[i].rotation) {
                  geometry.rotateZ(label[i].rotation);
              }
              geometry.translate(label[i].anchor[0], label[i].anchor[1], 0);
              // make shape ( N.B. edge view not visible )
              let textMesh = new global.THREE.Mesh(geometry, textMaterial);
              textMesh.layers.set(layer);
              group.add(textMesh);
          }
      });
      return group// text.position.z = 0;
  }

  function ShapePlanView(partDict, pointDict, partkeyNameList, index1, index2, sc, initPoint, r, lineMaterial) { //횡단면도 그리기
      // console.log(partDict)    
      // let result = {models:{},layer:color };
      let meshes = [];

      for (let pk in partDict) {
          let point = pointDict[pk];
          for (let partkey of partkeyNameList) {
              if (partDict[pk].hasOwnProperty(partkey)) {
                  if (partDict[pk][partkey].rotationX !== Math.PI / 2) {
                      let globalPts = [];
                      let pts = [];
                      for (let i in partDict[pk][partkey].points) {
                          globalPts.push(ToGlobalPoint2(point, partDict[pk][partkey].points[i]));
                      }
                      for (let i in globalPts) {
                          let x = (globalPts[i].x - initPoint.x) * sc;
                          let y = (globalPts[i].y - initPoint.y) * sc;
                          pts.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x });
                      }
                      meshes.push(sectionMesh(pts, lineMaterial));
                      // result.models[pk + partkey] = new makerjs.models.ConnectTheDots(true,pts);
                  }
                  else {
                      let globalPts = [];
                      let pts = [];
                      let points = [{ x: partDict[pk][partkey].points[index1].x, y: partDict[pk][partkey].z },
                      { x: partDict[pk][partkey].points[index2].x, y: partDict[pk][partkey].z },
                      { x: partDict[pk][partkey].points[index2].x, y: partDict[pk][partkey].Thickness + partDict[pk][partkey].z },
                      { x: partDict[pk][partkey].points[index1].x, y: partDict[pk][partkey].Thickness + partDict[pk][partkey].z }];
                      for (let i in points) {
                          globalPts.push(ToGlobalPoint2(point, points[i]));
                      }
                      for (let i in globalPts) {
                          let x = (globalPts[i].x - initPoint.x) * sc;
                          let y = (globalPts[i].y - initPoint.y) * sc;
                          pts.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x });
                      }
                      meshes.push(sectionMesh(pts, lineMaterial));
                      // result.models[pk + partkey] = new makerjs.models.ConnectTheDots(true,pts);
                  }
              }
          }
      }
      return meshes
  }

  function GirderSideView(steelBoxDict, keyNamelist, sectionPointNum, index1, index2, sc, initPoint, lineMaterial) { //측면도 그리기
      // let result = {models:{},layer:lineMaterial }; 
      // let index = 1;
      let meshes = [];
      for (let part in steelBoxDict) {
          for (let name of keyNamelist) {
              if (part.includes(name)) {
                  let ptsL1 = [];
                  let ptsR1 = [];
                  let ptsC1 = [];
                  let ptsL2 = [];
                  let ptsR2 = [];
                  let ptsC2 = [];
                  for (let j in steelBoxDict[part]["points"]) {
                      let pts1 = [];
                      let pts2 = [];
                      for (let i in steelBoxDict[part]["points"][j]) {
                          if (i % sectionPointNum === index1) {
                              let x = (steelBoxDict[part]["points"][j][i].x) * sc;
                              let y = (steelBoxDict[part]["points"][j][i].y - initPoint.z) * sc;
                              pts1.push({ x, y });
                              // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                          } else if (i % sectionPointNum === index2) {
                              let x = (steelBoxDict[part]["points"][j][i].x) * sc;
                              let y = (steelBoxDict[part]["points"][j][i].y - initPoint.z) * sc;
                              pts2.push({ x, y });
                              // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                          }
                      }
                      if (j == 0) {
                          ptsL1.push(...pts1);
                          ptsL2.push(...pts2);
                      }
                      if (j == 1) {
                          ptsR1.push(...pts1);
                          ptsR2.push(...pts2);
                      }
                      if (j == 2) {
                          ptsC1.push(...pts1);
                          ptsC2.push(...pts2);
                      }
                  }
                  if (ptsC1.length === 0) {
                      meshes.push(sectionMesh([...ptsL1, ...ptsL2.reverse()], lineMaterial));
                      meshes.push(sectionMesh([...ptsR1, ...ptsR2.reverse()], lineMaterial));
                  } else if (ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0) {
                      if (ptsC1[0].x === ptsL1[ptsL1.length - 1].x) {
                          meshes.push(sectionMesh(
                              [...ptsL1, ...ptsC1, ...ptsC2.reverse(), ...ptsR1.reverse(), ...ptsR2, ...ptsL2.reverse()], lineMaterial));
                      } else {
                          meshes.push(sectionMesh(
                              [...ptsL1.reverse(), ...ptsC1.reverse(), ...ptsC2, ...ptsR1, ...ptsR2.reverse(), ...ptsL2], lineMaterial));
                      }
                  }
                  else if (ptsL1.length === 0 && ptsL1.length === 0) {
                      meshes.push(sectionMesh(
                          [...ptsC1.reverse(), ...ptsC2], lineMaterial));
                  }
              }

          }
      }
      return meshes
  }


  // function GeneralSideView(steelBoxDict, keyNamelist, sectionPointNum, index1, index2, sc, initPoint, r, lineMaterial) { //측면도 그리기
  //     // let result = {models:{},layer:lineMaterial }; 
  //     // let index = 1;
  //     let meshes = [];
  //     for (let part in steelBoxDict) {
  //         for (let name of keyNamelist) {
  //             if (part.includes(name)) {
  //                 let ptsL1 = [];
  //                 let ptsR1 = [];
  //                 let ptsC1 = [];
  //                 let ptsL2 = [];
  //                 let ptsR2 = [];
  //                 let ptsC2 = [];
  //                 for (let j in steelBoxDict[part]["points"]) {
  //                     let pts1 = [];
  //                     let pts2 = [];
  //                     for (let i in steelBoxDict[part]["points"][j]) {
  //                         if (i % sectionPointNum === index1) {
  //                             let x = (steelBoxDict[part]["points"][j][i].s - initPoint.masterStationNumber) * sc
  //                             let y = (steelBoxDict[part]["points"][j][i].z - initPoint.z) * sc
  //                             pts1.push({ x, y })
  //                             // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
  //                         } else if (i % sectionPointNum === index2) {
  //                             let x = (steelBoxDict[part]["points"][j][i].s - initPoint.masterStationNumber) * sc
  //                             let y = (steelBoxDict[part]["points"][j][i].z - initPoint.z) * sc
  //                             pts2.push({ x, y })
  //                             // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
  //                         }
  //                     }
  //                     if (j == 0) {
  //                         ptsL1.push(...pts1)
  //                         ptsL2.push(...pts2)
  //                     }
  //                     if (j == 1) {
  //                         ptsR1.push(...pts1)
  //                         ptsR2.push(...pts2)
  //                     }
  //                     if (j == 2) {
  //                         ptsC1.push(...pts1)
  //                         ptsC2.push(...pts2)
  //                     }
  //                 }
  //                 if (ptsC1.length === 0) {
  //                     meshes.push(sectionMesh([...ptsL1, ...ptsL2.reverse()], lineMaterial));
  //                     meshes.push(sectionMesh([...ptsR1, ...ptsR2.reverse()], lineMaterial));
  //                 } else if (ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0) {
  //                     if (ptsC1[0][0] === ptsL1[ptsL1.length - 1][0] && ptsC1[0][1] === ptsL1[ptsL1.length - 1][1]) {
  //                         meshes.push(sectionMesh(
  //                             [...ptsL1, ...ptsC1, ...ptsC2.reverse(), ...ptsR1.reverse(), ...ptsR2, ...ptsL2.reverse()], lineMaterial));
  //                     } else {
  //                         meshes.push(sectionMesh(
  //                             [...ptsL1.reverse(), ...ptsC1.reverse(), ...ptsC2, ...ptsR1, ...ptsR2.reverse(), ...ptsL2], lineMaterial));
  //                     }
  //                 }
  //                 else if (ptsL1.length === 0 && ptsL1.length === 0) {
  //                     meshes.push(sectionMesh(
  //                         [...ptsC1.reverse(), ...ptsC2], lineMaterial));
  //                 }
  //             }

  //         }
  //     }
  //     return meshes
  // }

  function WebPlanView(steelBoxDict, keyNamelist, sectionPointNum, isTop, sc, initPoint, r, lineMaterial) { //강박스 일반도 그리기
      // let result = {models:{},layer:color };
      // let index = 1;
      let meshes = [];
      let index1 = 0;
      let index2 = 0;
      for (let part in steelBoxDict) {
          for (let name of keyNamelist) {
              if (part.includes(name)) {
                  let ptsL1 = [];
                  let ptsR1 = [];
                  let ptsC1 = [];
                  let ptsL2 = [];
                  let ptsR2 = [];
                  let ptsC2 = [];
                  for (let j in steelBoxDict[part]["points"]) {
                      let pts1 = [];
                      let pts2 = [];
                      if (j == 0) {
                          index1 = 0;
                          index2 = 3;
                      }
                      if (j == 1) {
                          index1 = 0;
                          index2 = 3;
                      }
                      if (j == 2) {
                          index1 = isTop ? 1 : 0;
                          index2 = isTop ? 2 : 3;
                      }
                      for (let i in steelBoxDict[part]["points"][j]) {
                          if (i % sectionPointNum === index1) {
                              let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x) * sc;
                              let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y) * sc;
                              pts1.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x });
                              // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                          } else if (i % sectionPointNum === index2) {
                              let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x) * sc;
                              let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y) * sc;
                              pts2.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x });
                              // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                          }

                      }
                      if (j == 0) {
                          ptsL1.push(...pts1);
                          ptsL2.push(...pts2);
                      }
                      if (j == 1) {
                          ptsR1.push(...pts1);
                          ptsR2.push(...pts2);
                      }
                      if (j == 2) {
                          ptsC1.push(...pts1);
                          ptsC2.push(...pts2);
                      }
                  }
                  if (ptsC1.length === 0) {
                      if (isTop) {
                          meshes.push(sectionMesh([...ptsR1, ...ptsR2.reverse()], lineMaterial));
                      } else {
                          meshes.push(sectionMesh([...ptsL1, ...ptsL2.reverse()], lineMaterial));
                      }

                  }
                  else if (ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0) {

                      if (isTop) {
                          if (ptsC1[0].x === ptsR1[ptsL1.length - 1].x && ptsC1[0].y === ptsR1[ptsL1.length - 1].y) {
                              meshes.push(sectionMesh(
                                  [...ptsR1, ...ptsC1, ...ptsC2.reverse(), ...ptsR2.reverse()], lineMaterial));
                          } else {
                              meshes.push(sectionMesh(
                                  [...ptsC1, ...ptsR1, ...ptsR2.reverse(), ...ptsC2.reverse()], lineMaterial));
                          }
                      } else {
                          if (ptsC1[0].x === ptsL1[ptsL1.length - 1].x && ptsC1[0].y === ptsL1[ptsL1.length - 1].y) {
                              meshes.push(sectionMesh(
                                  [...ptsL1, ...ptsC1, ...ptsC2.reverse(), ...ptsL2.reverse()], lineMaterial));
                          } else {
                              meshes.push(sectionMesh(
                                  [...ptsC1, ...ptsL1, ...ptsL2.reverse(), ...ptsC2.reverse()], lineMaterial));
                          }
                      }
                  }
                  else if (ptsL1.length === 0 && ptsL1.length === 0) {
                      meshes.push(sectionMesh(
                          [...ptsC1.reverse(), ...ptsC2], lineMaterial));
                  }

              }
          }
      }
      return meshes
  }


  function GeneralPlanView(steelBoxDict, keyNamelist, sectionPointNum, index1, index2, sc, initPoint, r, lineMaterial) { //강박스 일반도 그리기
      // let result = {models:{},layer:color };
      // let index = 1;
      let meshes = [];
      for (let part in steelBoxDict) {
          for (let name of keyNamelist) {
              if (part.includes(name)) {
                  let ptsL1 = [];
                  let ptsR1 = [];
                  let ptsC1 = [];
                  let ptsL2 = [];
                  let ptsR2 = [];
                  let ptsC2 = [];
                  for (let j in steelBoxDict[part]["points"]) {
                      let pts1 = [];
                      let pts2 = [];
                      for (let i in steelBoxDict[part]["points"][j]) {
                          if (i % sectionPointNum === index1) {
                              let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x) * sc;
                              let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y) * sc;
                              pts1.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x });
                              // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                          } else if (i % sectionPointNum === index2) {
                              let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x) * sc;
                              let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y) * sc;
                              pts2.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x });
                              // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                          }

                      }
                      if (j == 0) {
                          ptsL1.push(...pts1);
                          ptsL2.push(...pts2);
                      }
                      if (j == 1) {
                          ptsR1.push(...pts1);
                          ptsR2.push(...pts2);
                      }
                      if (j == 2) {
                          ptsC1.push(...pts1);
                          ptsC2.push(...pts2);
                      }
                  }
                  if (ptsC1.length === 0) {
                      meshes.push(sectionMesh([...ptsL1, ...ptsL2.reverse()], lineMaterial));
                      meshes.push(sectionMesh([...ptsR1, ...ptsR2.reverse()], lineMaterial));
                      // result.models[name + index.toString()] = new makerjs.models.ConnectTheDots(true,[...ptsL1,...ptsL2.reverse()]);
                      // index +=1
                      // result.models[name + index.toString()] = new makerjs.models.ConnectTheDots(true,[...ptsR1,...ptsR2.reverse()]);
                      // index +=1    
                  }

                  else if (ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0) {
                      if (ptsC1[0].x === ptsL1[ptsL1.length - 1].x && ptsC1[0].y === ptsL1[ptsL1.length - 1].y) {
                          meshes.push(sectionMesh(
                              [...ptsL1, ...ptsC1, ...ptsC2.reverse(), ...ptsR1.reverse(), ...ptsR2, ...ptsL2.reverse()], lineMaterial));
                      } else {
                          meshes.push(sectionMesh(
                              [...ptsL1.reverse(), ...ptsC1.reverse(), ...ptsC2, ...ptsR1, ...ptsR2.reverse(), ...ptsL2], lineMaterial));
                      }
                  }
                  else if (ptsL1.length === 0 && ptsL1.length === 0) {
                      meshes.push(sectionMesh(
                          [...ptsC1.reverse(), ...ptsC2], lineMaterial));
                  }

              }
          }
      }
      return meshes
  }

  function roundedRect(x, y, rot, width, height, radius, lineMaterial) { //마크 테두리
      let shape = new global.THREE.Shape();
      shape.moveTo(-width / 2, -height / 2 + radius);
      shape.lineTo(-width / 2, height / 2 - radius);
      shape.quadraticCurveTo(-width / 2, height / 2, -width / 2 + radius, height / 2);
      shape.lineTo(width / 2 - radius, height / 2);
      shape.quadraticCurveTo(width / 2, height / 2, width / 2, height / 2 - radius);
      shape.lineTo(width / 2, -height / 2 + radius);
      shape.quadraticCurveTo(width / 2, -height / 2, width / 2 - radius, -height / 2);
      shape.lineTo(-width / 2 + radius, -height / 2);
      shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2, -height / 2 + radius);
      let points = shape.getPoints();
      let geometry = new global.THREE.BufferGeometry().setFromPoints(points);
      geometry.rotateZ(rot);
      geometry.translate(x, y, 0);
      // console.log("geo", geometry)
      return new global.THREE.Line(geometry, lineMaterial)
  }

  function PointToDraw(point, scale, initPoint, rotate, xOffset, yOffset) { //DrawingPointConverter
      let cos = point.normalCos;
      let sin = point.normalSin;
      let x0 = (point.x - initPoint.x - sin * xOffset - cos * yOffset) * scale;
      let y0 = (point.y - initPoint.y + cos * xOffset - sin * yOffset) * scale;
      return { x: Math.cos(rotate) * x0 - Math.sin(rotate) * y0, y: Math.cos(rotate) * y0 + Math.sin(rotate) * x0 }
  }

  function GridMarkView(girderStation, scale, initPoint, rotate, layout, girderIndex) {   //그리드 마크와 보조선 그리기 + 치수선도 포함해서 그릭기

      let redLine = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let redDotLine = new global.THREE.LineDashedMaterial({ color: 0xff0000, dashSize: 300, gapSize: 100, });
      let geo = new global.THREE.Geometry();
      let dimgeo = new global.THREE.Geometry();
      let fontSize = 80;
      let meshes = [];
      let labels = [];
      let rot = 0;

      let dummy0 = {};
      let dummy1 = {};
      let dummy2 = {};
      let dummy4 = {};
      let sideViewOffset = layout.sideViewOffset * scale;
      let markOffset = layout.gridMarkWidth;
      let totalLength = 0;
      let dummyLength = 0;
      let dummyLength2 = 0;

      // for (let i = 0; i < girderStation.length; i++) {
      let girderLine = [];
      let girderSideLine = [];
      let dimLine = []; //8개, w와 동일한 개수
      // let dimWF = [];
      // 지지선 입력체계 수립필요 2020.5.22 by dr.lim
      let dimName = ["Girder Length", "Splice", "Top Plate", "", "", "Bottom Plate", "Web", "V-Stiffener", ""];
      let w = [1.8 * markOffset, 1.6 * markOffset, 1.4 * markOffset, 1.2 * markOffset, -1.2 * markOffset, -1.4 * markOffset,
      sideViewOffset + 1.6 * markOffset, sideViewOffset + 1.4 * markOffset, sideViewOffset + 1.2 * markOffset];    //dim line 기준점
      w.forEach(function (x) { dimLine.push([]); });
      for (let j = 0; j < girderStation.length; j++) {
          let gridObj = girderStation[j];
          let cos = gridObj.point.normalCos;
          let sin = gridObj.point.normalSin;
          rot = Math.atan2(cos, - sin) + rotate;
          // if (j !== 0) { segLength = splineProp(dummy0, gridObj.point).length };
          // totalLength += segLength;
          totalLength = gridObj.point.girderStation;
          // console.log("totalLength", totalLength)
          dummy0 = gridObj.point;
          girderLine.push(PointToDraw(gridObj.point, scale, initPoint, rotate, 0, 0));
          girderSideLine.push({ x: totalLength * scale, y: (gridObj.point.z - initPoint.z) * scale + sideViewOffset, z: 0 });

          for (let k = 0; k < w.length; k++) {
              if (k > 5) {
                  dimLine[k].push({ x: (totalLength) * scale, y: w[k] });
              }
              else {
                  dimLine[k].push(PointToDraw(gridObj.point, scale, initPoint, rotate, 0, w[k]));
              }
          }
          if (j === 0) {
              let position = PointToDraw(gridObj.point, scale, initPoint, rotate, -500, 0);
              labels.push({
                  text: "GIRDER-" + girderIndex + " C.L.",
                  anchor: [position.x, position.y, 0],
                  rotation: rot,
                  fontSize: fontSize * scale
              });
              for (let k = 0; k < w.length; k++) {
                  if (dimName[k] !== "") {
                      let anchor = {};
                      let p1 = {};
                      let p2 = dimLine[k][j];
                      if (k > 5) {
                          anchor = { x: dimLine[k][j].x - 1000 * scale, y: dimLine[k][j].y + fontSize * 0.75 };
                          p1 = { x: dimLine[k][j].x - 1000 * scale, y: dimLine[k][j].y };
                      } else {
                          anchor = PointToDraw(gridObj.point, scale, initPoint, rotate, -1000, w[k] + fontSize * 0.75);
                          p1 = PointToDraw(gridObj.point, scale, initPoint, rotate, -1000, w[k]);
                      }
                      dimgeo.vertices.push(
                          new global.THREE.Vector3(p2.x, p2.y, 0),
                          new global.THREE.Vector3(p1.x, p1.y, 0));
                      labels.push({
                          text: dimName[k],
                          anchor: [anchor.x, anchor.y, 0],
                          rotation: k > 5 ? 0 : rot,
                          fontSize: fontSize * scale,
                          align: "left"
                      });
                  }
              }
          }
          if (j === 0 || j === girderStation.length - 1) { //거더총길이
              dimgeo.vertices.push(
                  new global.THREE.Vector3(dimLine[0][j].x, dimLine[0][j].y, 0),
                  new global.THREE.Vector3(dimLine[1][j].x, dimLine[1][j].y, 0));
          }
          if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("SP")) {   //현장이음부
              dimgeo.vertices.push(
                  new global.THREE.Vector3(dimLine[1][j].x, dimLine[1][j].y, 0),
                  new global.THREE.Vector3(dimLine[2][j].x, dimLine[2][j].y, 0));
              if (j !== 0) {
                  let dimProp = splineProp(dummy1, gridObj.point);
                  // console.log("spline", dimProp,dummy1,gridObj.point)
                  let position = PointToDraw(dimProp.midPoint, scale, initPoint, rotate, 0, w[1] + fontSize * 0.75);   //fontSize에 대한 값을 scale 적용않고 정의
                  labels.push({
                      text: dimProp.length.toFixed(0),
                      anchor: [position.x, position.y, 0],
                      rotation: Math.atan2(dimProp.midPoint.normalCos, - dimProp.midPoint.normalSin) + rotate,
                      fontSize: fontSize * scale
                  });
              }
              dummy1 = gridObj.point;

          }
          if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("SP") || gridObj.key.includes("TF")) { //상부플렌지 이음
              dimgeo.vertices.push(
                  new global.THREE.Vector3(dimLine[2][j].x, dimLine[2][j].y, 0),
                  new global.THREE.Vector3(dimLine[3][j].x, dimLine[3][j].y, 0));
              if (j !== 0) {
                  let dimProp = splineProp(dummy2, gridObj.point);
                  let position = PointToDraw(dimProp.midPoint, scale, initPoint, rotate, 0, w[2] + fontSize * 0.75);   //fontSize에 대한 값을 scale 적용않고 정의
                  labels.push({
                      text: dimProp.length.toFixed(0),
                      anchor: [position.x, position.y, 0],
                      rotation: Math.atan2(dimProp.midPoint.normalCos, - dimProp.midPoint.normalSin) + rotate,
                      fontSize: fontSize * scale
                  });
              }
              dummy2 = gridObj.point;

          }
          if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("SP") || gridObj.key.includes("BF")) {  //하부플렌지 이음
              dimgeo.vertices.push(
                  new global.THREE.Vector3(dimLine[4][j].x, dimLine[4][j].y, 0),
                  new global.THREE.Vector3(dimLine[5][j].x, dimLine[5][j].y, 0));
              if (j !== 0) {
                  let dimProp = splineProp(dummy4, gridObj.point);
                  let position = PointToDraw(dimProp.midPoint, scale, initPoint, rotate, 0, w[5] + fontSize * 0.75);   //fontSize에 대한 값을 scale 적용않고 정의
                  labels.push({
                      text: dimProp.length.toFixed(0),
                      anchor: [position.x, position.y, 0],
                      rotation: Math.atan2(dimProp.midPoint.normalCos, - dimProp.midPoint.normalSin) + rotate,
                      fontSize: fontSize * scale
                  });
              }
              dummy4 = gridObj.point;
          }
          if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("SP") || gridObj.key.includes("WF")) {   //웹플렌지 이음
              // let pt1 = { x: totalLength * scale, y: (sideViewOffset + 1.4 * markOffset) * scale, z: 0 }
              dimgeo.vertices.push(
                  new global.THREE.Vector3(dimLine[6][j].x, dimLine[6][j].y, 0),
                  new global.THREE.Vector3(dimLine[7][j].x, dimLine[7][j].y, 0));
              // new THREE.Vector3(totalLength * scale, (sideViewOffset + 1.2 * markOffset) * scale, 0),
              // new THREE.Vector3(pt1.x, pt1.y, pt1.z));
              if (j !== 0) {
                  let position = { x: (totalLength + dummyLength) / 2 * scale, y: (w[6] + fontSize * 0.75) * scale };
                  labels.push({
                      text: (totalLength - dummyLength).toFixed(0),
                      anchor: [position.x, position.y, 0],
                      rotation: 0,
                      fontSize: fontSize * scale
                  });
              }
              dummyLength = totalLength;

          }

          if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("V") || gridObj.key.includes("D") || gridObj.key.substr(2, 1) === "S"
              && gridObj.key.substr(3, 1) !== "P") {  // 그리드 기호에 대해서 한번 대대적인 수정이 필요할 것으로 판단됨
              dimgeo.vertices.push(//치수선 라벨
                  new global.THREE.Vector3(dimLine[7][j].x, dimLine[7][j].y, 0),
                  new global.THREE.Vector3(dimLine[8][j].x, dimLine[8][j].y, 0));
              if (j !== 0) {
                  let position = { x: (totalLength + dummyLength2) / 2 * scale, y: (w[7] + fontSize * 0.75) * scale };
                  labels.push({
                      text: (totalLength - dummyLength2).toFixed(0),
                      anchor: [position.x, position.y, 0],
                      rotation: 0,
                      fontSize: fontSize * scale
                  });
              }
              dummyLength2 = totalLength;
          }


          if (gridObj.key.substr(2, 1) !== "K" && !gridObj.key.includes("CR")) { //station.substr(0,2)==="G1" && 
          let markTop = 0;
          if (gridObj.key.substr(2, 1) === "S" || gridObj.key.substr(2, 1) === "V" || gridObj.key.substr(2, 1) === "D" || gridObj.key.substr(2, 1) === "T" ){
              markTop = 300;
          }
              let position = PointToDraw(gridObj.point, scale, initPoint, rotate, 0, markOffset + markTop);
              meshes.push(roundedRect(position.x, position.y, rot, 400 * scale, 200 * scale, 100 * scale, redLine));
              labels.push({
                  text: gridObj.key,
                  anchor: [position.x, position.y, 0],
                  rotation: rot,
                  fontSize: fontSize * scale
              });
              let pt1 = PointToDraw(gridObj.point, scale, initPoint, rotate, 0, markOffset + markTop - 100);
              let pt2 = PointToDraw(gridObj.point, scale, initPoint, rotate, 0, - markOffset + 100);
              geo.vertices.push(
                  new global.THREE.Vector3(pt1.x, pt1.y, 0),
                  new global.THREE.Vector3(pt2.x, pt2.y, 0));

              // side View gridMark
              position = { x: totalLength * scale, y: (gridObj.point.z - initPoint.z) * scale + sideViewOffset + (300 + markTop) * scale, z: 0 };
              meshes.push(roundedRect(position.x, position.y, 0, 400 * scale, 200 * scale, 100 * scale, redLine));
              labels.push({
                  text: gridObj.key,
                  anchor: [position.x, position.y, 0],
                  rotation: 0,
                  fontSize: fontSize * scale
              });
              pt1 = { x: totalLength * scale, y: (gridObj.point.z - initPoint.z) * scale + sideViewOffset + (200 + markTop) * scale, z: 0 };
              pt2 = { x: totalLength * scale, y: (gridObj.point.z - initPoint.z) * scale + sideViewOffset, z: 0 };
              geo.vertices.push(
                  new global.THREE.Vector3(pt1.x, pt1.y, 0),
                  new global.THREE.Vector3(pt2.x, pt2.y, 0));


          }
      }

      meshes.push(LineMesh$1(girderLine, redDotLine, 0));
      meshes.push(LineMesh$1(girderSideLine, redDotLine, 0));
      for (let k = 0; k < w.length; k++) {
          if (dimName[k] !== "") {
              meshes.push(LineMesh$1(dimLine[k], redLine, 0));
          }
      }
      // meshes.push(LineMesh(dimWF, redLine,0))
      // dimLine.forEach(function (dim) { meshes.push(LineMesh(dim, redLine, 0)) });
      // }
      let segLine = new global.THREE.LineSegments(geo, redLine);
      segLine.computeLineDistances();
      let dimSegLine = new global.THREE.LineSegments(dimgeo, redLine);
      meshes.push(segLine);
      meshes.push(dimSegLine);

      return { meshes, labels }
  }

  // r is rotation angle to radian
  function topDraw(steelBoxDict, hBracing, diaDict, vstiffDict, xbeamDict, gridPoint, initPoint, girderStation) {
      let group = new global.THREE.Group();
      const hBracingDict = hBracing.hBracingDict;
      const hBracingPlateDict = hBracing.hBracingPlateDict;

      let sc = 0.500;
      let r = Math.PI - Math.atan((gridPoint["G1K6"].y - gridPoint["G1K1"].y) / (gridPoint["G1K6"].x - gridPoint["G1K1"].x));
      let aqua = new global.THREE.MeshBasicMaterial({ color: 0x00ffff });   // white 0xffffff
      let green = new global.THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff
      let topPlate = GeneralPlanView(steelBoxDict, ["TopPlate"], 4, 0, 1, sc, initPoint, r, aqua);
      topPlate.forEach(function (mesh) { group.add(mesh); });
      let webPlate = GeneralPlanView(steelBoxDict, ["LeftWeB", "RightWeB"], 4, 1, 2, sc, initPoint, r, green);
      webPlate.forEach(function (mesh) { group.add(mesh); });
      // let diaphragm = ShapePlanView(diaDict, gridPoint, ["topPlate", "upperTopShape", "leftTopPlateShape"], 0, 1, sc, initPoint, r, green);
      // diaphragm.forEach(function (mesh) { group.add(mesh) });
      let bracingPlate = ShapePlanView(hBracingPlateDict, gridPoint, ["plate"], 0, 1, sc, initPoint, r, green);
      bracingPlate.forEach(function (mesh) { group.add(mesh); });
      // let vStiffner = ShapePlanView(vstiffDict, gridPoint, ["upperframe1", "upperframe2"], 0, 3, sc, initPoint, r, green);
      // vStiffner.forEach(function (mesh) { group.add(mesh) });
      let bracing = GeneralPlanView(hBracingDict, [""], 4, 0, 1, sc, initPoint, r, green);
      bracing.forEach(function (mesh) { group.add(mesh); });

      for (let i in diaDict) {
          for (let key in diaDict[i]) {
              let TopMesh = PartTopMesh(diaDict[i][key], sc, initPoint, r);
              TopMesh.forEach(function (mesh) {
                  group.add(mesh);
              });
          }
      }

      for (let i in vstiffDict) {
          for (let key in vstiffDict[i]) {
              let TopMesh = PartTopMesh(vstiffDict[i][key], sc, initPoint, r);
              TopMesh.forEach(function (mesh) {
                  group.add(mesh);
              });
          }
      }

      for (let i in xbeamDict) {
          for (let key in xbeamDict[i]) {
              let TopMesh = PartTopMesh(xbeamDict[i][key], sc, initPoint, r);
              TopMesh.forEach(function (mesh) {
                  group.add(mesh);
              });
          }
      }



      // let gridMark = GridMarkView(girderStation[0], sc, initPoint, r, 1400)
      // gridMark.meshes.forEach(function (mesh) { group.add(mesh) });
      // group.add(LabelInsert(gridMark.labels, new THREE.MeshBasicMaterial({ color: 0xffffff }), layNum))

      return group
  }

  function GirderGeneralDraw1(girderStation, layout) {
      // let layout = {
      //     layer : 5,
      //     scale : 1,
      //     girderOffset : 24000,
      //     gridMarkWidth : 1500,
      // }
      let group = new global.THREE.Group();
      // let layerNum = 5;
      let scale = layout.scale;
      let girderOffset = layout.girderOffset * scale;
      let gridMarkWidth = layout.gridMarkWidth * scale; // unit : mm
      for (let i = 0; i < girderStation.length; i++) {
          let initPoint = girderStation[i][0].point;
          let endPoint = girderStation[i][girderStation[i].length - 1].point;
          let rotate = Math.PI - Math.atan((endPoint.y - initPoint.y) / (endPoint.x - initPoint.x));
          let gridMark = GridMarkView(girderStation[i], scale, initPoint, rotate, layout, i + 1);
          gridMark.meshes.forEach(function (mesh) {
              mesh.position.set(0, -i * girderOffset, 0);
              group.add(mesh);
          }); 
          let label = LabelInsert(gridMark.labels, new global.THREE.MeshBasicMaterial({ color: 0xffffff }), layout.layer);
          label.position.set(0, -i * girderOffset, 0);
          group.add(label);
      }
      return group
  }

  function XbeamSection(xbeamDict, girderStation, layout) {
      let group = new global.THREE.Group();
      let lineMaterial = new global.THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00
      let scale = layout.scale;
      let girderOffset = layout.girderOffset * scale;  //24000;
      let sideViewOffset = layout.sideViewOffset * scale; // -8000 * scale;
      let sectionViewOffset = layout.sectionViewOffset * scale;    let initZ = [];
      let supportNum = layout.supportNum; //3; // layout 변수안에서 자동계산되어야 함. 
      let xoffset = 20000;
      let girderNum = layout.girderNum; //girderStation.length // layout 변수안에서 자동계산되어야 함. 

      for (let j = 0; j < supportNum; j++) {
          for (let i = 0; i < girderNum; i++) {
              let girderPoint = girderStation[i].find(obj => obj.key.includes("G" + (i + 1) + "S" + (j + 1)));
              if (i === 0) { initZ.push(girderPoint.point.z); }
          }
      }

      for (let j = 0; j < supportNum; j++) {
          for (let i = 0; i < girderNum - 1; i++) {
              let key = ("G" + (i + 1) + "S" + (j + 1)) + "G" + (i + 2) + "S" + (j + 1);
              if (xbeamDict[key]) {
                  let centerPoint;
                  for (let k in xbeamDict[key]) {
                      if (xbeamDict[key][k].point.offset) {
                          centerPoint = xbeamDict[key][k].point;
                          break;
                      }
                  }
                  let meshes = DiaSectionMesh(xbeamDict[key], lineMaterial);
                  meshes.forEach(function (mesh) {
                      mesh.translateX(centerPoint.offset + j * xoffset);
                      mesh.translateY(sectionViewOffset + centerPoint.z - initZ[j]);
                      // position.set(offset + j * xoffset, sectionViewOffset + girderPoint.point.z - initZ[j], 0)
                      group.add(mesh);
                  });

              }
          }
      }
      return group
  }




  function PartGeneralDraw(diaDict, girderStation, layout) {
      
      let group = new global.THREE.Group();
      // let layerNum = 5;
          // let layout = {
      //     layer : 5,
      //     scale : 1,
      //     girderOffset : 24000,
      //     sideViewOffset : -8000,
      //     sectionViewOffset : 16000
      //     gridMarkWidth : 1500,
      // }
      let scale = layout.scale; //layout.scale
      let girderOffset = layout.girderOffset * scale;
      let sideViewOffset = layout.sideViewOffset * scale;
      let sectionViewOffset = layout.sectionViewOffset * scale;
      let lineMaterial = new global.THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00
      let initPoint = [];
      let endPoint = [];
      let rotate = [];
      // let boltlocate = [];

      for (let i in girderStation) {
          initPoint.push(girderStation[i][0].point);
          endPoint.push(girderStation[i][girderStation[i].length - 1].point);
          rotate.push(Math.PI - Math.atan((endPoint[i].y - initPoint[i].y) / (endPoint[i].x - initPoint[i].x)));
      }

      let initZ = [];
      let supportNum = layout.supportNum; // layout 변수안에서 자동계산되어야 함. 
      let xoffset = 20000;
      let girderNum = layout.girderNum; // layout 변수안에서 자동계산되어야 함. 

      for (let j = 0; j < supportNum; j++) {
          for (let i = 0; i < girderNum; i++) {
              let girderPoint = girderStation[i].find(obj => obj.key.includes("G" + (i + 1) + "S" + (j + 1)));
              if (i === 0) { initZ.push(girderPoint.point.z); }
              let offset = girderPoint.point.offset;
              if (diaDict[girderPoint.key]) {
                  let diaMesh = DiaSectionMesh(diaDict[girderPoint.key], lineMaterial);
                  diaMesh.forEach(function (mesh) {
                      mesh.translateX(offset + j * xoffset);
                      mesh.translateY(sectionViewOffset + girderPoint.point.z - initZ[j]);
                      // position.set(offset + j * xoffset, sectionViewOffset + girderPoint.point.z - initZ[j], 0)
                      group.add(mesh);
                  });
              }
          }
      }



      for (let i in diaDict) {
          for (let key in diaDict[i]) {
              let index = i.substr(1, 1) * 1 - 1; //거더번호

              let TopMesh = PartTopMesh(diaDict[i][key], scale, initPoint[index], rotate[index]);
              TopMesh.forEach(function (mesh) {
                  mesh.translateY(-index * girderOffset);
                  group.add(mesh);
              });

              let sideMesh = PartSideMesh(diaDict[i][key], scale, initPoint[index]);
              sideMesh.forEach(function (mesh) {
                  mesh.translateY(sideViewOffset - index * girderOffset);
                  group.add(mesh);
              });
          }
      }
      return group
  }

  function PartTopMesh(Part, scale, initPoint, rotate) {
      let meshes = [];
      let lineMaterial = new global.THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00
      let green = new global.THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff
      let red = new global.THREE.MeshBasicMaterial({ color: 0xff0000 });   // white 0xffffff

      // let index = i.substr(1, 1) * 1 - 1; //거더번호
      // let rotationY = Part.rotationY;
      let centerPoint = Part.point;
      let cos = Math.cos(Part.rotationY);
      let cosx = Math.cos(Part.rotationX);
      if (Part.topView) {
          let newPt = [];
          Part.topView.forEach(function (pt) {
              let x = (pt.x - initPoint.x) * scale;
              let y = (pt.y - initPoint.y) * scale;
              newPt.push({ x: Math.cos(rotate) * x - Math.sin(rotate) * y, y: Math.cos(rotate) * y + Math.sin(rotate) * x });
          });
          let mesh = sectionMesh(newPt, green);
          meshes.push(mesh);
          // }
      }
      if (Part.bolt) {
          if (Part.bolt.isUpper === false) { //복부에 위치하는 볼트의 경우 모두 상단기준면임을 근거로 함. 2020.7.7 by drlim
              let boltDia = Part.bolt.dia;
              let circle = new global.THREE.EllipseCurve(0, 0, boltDia / 2, boltDia / 2);
              let cp = circle.getPoints(16);
              let circlegeo = new global.THREE.Geometry().setFromPoints(cp);
              // if (Part.bolt.isUpper === false) { //복부에 위치하는 볼트의 경우 모두 상단기준면임을 근거로 함. 2020.7.7 by drlim
              let rot = Math.atan2(centerPoint.normalCos, - centerPoint.normalSin) + rotate;
              let lcos = Math.cos(rot);
              let lsin = Math.sin(rot);
              let pts = [];
              let newPt = [];
              let points = [];
              for (let k in Part.bolt.layout) {
                  let x = Part.bolt.layout[k][0];
                  let y = Part.bolt.layout[k][1];
                  let gpt = ToGlobalPoint(centerPoint, { x: x * cos, y: 0 });
                  let th = y * cosx;
                  let dx = centerPoint.normalSin * th;
                  let dy = centerPoint.normalCos * th;
                  pts.push({ x: gpt.x - dx, y: gpt.y + dy });
              }
              pts.forEach(function (pt) {
                  let x = (pt.x - initPoint.x) * scale;
                  let y = (pt.y - initPoint.y) * scale;
                  newPt.push({ x: Math.cos(rotate) * x - Math.sin(rotate) * y, y: Math.cos(rotate) * y + Math.sin(rotate) * x });
              });
              newPt.forEach(function (pt) {
                  points.push({ x: pt.x + (lcos * boltDia) * scale, y: pt.y + (lsin * boltDia) * scale });
                  points.push({ x: pt.x - (lcos * boltDia) * scale, y: pt.y - (lsin * boltDia) * scale });
                  points.push({ x: pt.x - (lsin * boltDia) * scale, y: pt.y + (lcos * boltDia) * scale });
                  points.push({ x: pt.x + (lsin * boltDia) * scale, y: pt.y - (lcos * boltDia) * scale });
              });
              newPt.forEach(function (pt) {
                  let boltCircle = new global.THREE.Line(circlegeo, green);
                  boltCircle.position.set(pt.x, pt.y, 0);
                  meshes.push(boltCircle);
              });
              let mesh = LineSegMesh(points, red, 0);
              meshes.push(mesh);
          }
      }
      return meshes
  }

  function PartSideMesh(Part, scale, initPoint, rotate) {
      let meshes = [];
      // let lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00
      let green = new global.THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff
      let red = new global.THREE.MeshBasicMaterial({ color: 0xff0000 });   // white 0xffffff
      let rotationY = Part.rotationY;
      let centerPoint = Part.point;
      // let cos = Math.cos(Part.rotationY)
      // let cosx = Math.cos(Part.rotationX)

      if (Part.sideView) {
          let newPt = [];
          Part.sideView.forEach(function (pt) {
              let x = (pt.x) * scale;
              let y = (pt.y - initPoint.z) * scale;
              newPt.push({ x, y });
          });
          let mesh = sectionMesh(newPt, green);
          // mesh.position.set(0, sideViewOffset - index * girderOffset, 0);
          meshes.push(mesh);

          if (Part.bolt) {
              let boltDia = Part.bolt.dia;
              let circle = new global.THREE.EllipseCurve(0, 0, boltDia / 2, boltDia / 2);
              let cp = circle.getPoints(16);
              let circlegeo = new global.THREE.Geometry().setFromPoints(cp);

              if (rotationY > Math.PI / 4 || rotationY < -Math.PI / 4) {
                  // let dz = 0
                  let points = [];
                  // if (typeof side2D === "number") { dz = side2D } // 해당내용은 실행이 안될수밖에 없음
                  let X = (centerPoint.girderStation) * scale;
                  let Y = ((Part.sideView[0].y + Part.sideView[2].y) / 2 - initPoint.z) * scale;
                  for (let k in Part.bolt.layout) {
                      let y = Part.bolt.layout[k][0];
                      let x = Part.bolt.layout[k][1];
                      points.push({ x: X + (x + boltDia) * scale, y: Y + (y * Math.sin(rotationY)) * scale });
                      points.push({ x: X + (x - boltDia) * scale, y: Y + (y * Math.sin(rotationY)) * scale });
                      points.push({ x: X + (x) * scale, y: Y + (y * Math.sin(rotationY) + boltDia) * scale });
                      points.push({ x: X + (x) * scale, y: Y + (y * Math.sin(rotationY) - boltDia) * scale });
                      let boltCircle = new global.THREE.Line(circlegeo, green);
                      boltCircle.position.set(X + x * scale, Y + (y * Math.sin(rotationY)) * scale, 0);
                      meshes.push(boltCircle);
                  }
                  let mesh = LineSegMesh(points, red, 0);
                  meshes.push(mesh);
              }
          }
      }

      return meshes
  }

  function GirderGeneralDraw2(sectionPointDict, girderStation, steelBoxDict, deckPointDict, layout) {
      
      let group = new global.THREE.Group();
      // let layerNum = 5;
          // let layout = {
      //     layer : 5,
      //     scale : 1,
      //     girderOffset : 24000,
      //     sideViewOffset : -8000,
      //     sectionViewOffset : 16000
      //     gridMarkWidth : 1500,
      // }
      let scale = layout.scale;
      let girderOffset = layout.girderOffset * scale;
      let sideViewOffset = layout.sideViewOffset * scale;
      let sectionViewOffset = layout.sectionViewOffset * scale;
      // let gridMarkWidth = layout.gridMarkWidth * scale; // unit : mm

      let aqua = new global.THREE.MeshBasicMaterial({ color: 0x00ffff });   // white 0xffffff
      let green = new global.THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff
      let white = new global.THREE.MeshBasicMaterial({ color: 0xffffff });
      let magenta = new global.THREE.MeshBasicMaterial({ color: 0xff00ff });

      for (let i = 0; i < girderStation.length; i++) {
          let initPoint = girderStation[i][0].point;
          let endPoint = girderStation[i][girderStation[i].length - 1].point;
          let rotate = Math.PI - Math.atan((endPoint.y - initPoint.y) / (endPoint.x - initPoint.x));
          let topPlate = GeneralPlanView(steelBoxDict, ["G" + (i + 1).toFixed(0) + "TopPlate"], 4, 0, 1, scale, initPoint, rotate, aqua);
          topPlate.forEach(function (mesh) {
              mesh.position.set(0, -i * girderOffset, 0);
              group.add(mesh);
          });
          let webPlate = WebPlanView(steelBoxDict, ["G" + (i + 1).toFixed(0) + "LeftWeB", "G" + (i + 1).toFixed(0) + "RightWeB"], 4, true, scale, initPoint, rotate, green);
          webPlate.forEach(function (mesh) {
              mesh.position.set(0, -i * girderOffset, 0);
              group.add(mesh);
          });
          let Urib = GeneralPlanView(steelBoxDict, ["G" + (i + 1).toFixed(0) + "uRib"], 4, 0, 3, scale, initPoint, rotate, magenta);
          Urib.forEach(function (mesh) {
              mesh.position.set(0, -i * girderOffset, 0);
              group.add(mesh);
          });



          let topSide = GirderSideView(steelBoxDict, ["G" + (i + 1).toFixed(0) + "TopSide"], 2, 0, 1, scale, initPoint, aqua);
          topSide.forEach(function (mesh) {
              mesh.position.set(0, sideViewOffset - i * girderOffset, 0);
              group.add(mesh);
          });
          let bottomSide = GirderSideView(steelBoxDict, ["G" + (i + 1).toFixed(0) + "BottomSide"], 2, 0, 1, scale, initPoint, aqua);
          bottomSide.forEach(function (mesh) {
              mesh.position.set(0, sideViewOffset - i * girderOffset, 0);
              group.add(mesh);
          });
          let webSide = GirderSideView(steelBoxDict, ["G" + (i + 1).toFixed(0) + "WebSide"], 2, 0, 1, scale, initPoint, aqua);
          webSide.forEach(function (mesh) {
              mesh.position.set(0, sideViewOffset - i * girderOffset, 0);
              group.add(mesh);
          });

          let girderSection = GirderSectionView(deckPointDict, sectionPointDict, girderStation, scale, sectionViewOffset);
          girderSection.meshes.forEach(function (mesh) {
              // mesh.position.set(0, sideViewOffset - i * girderOffset, 0);
              group.add(mesh);
          });
          group.add(LabelInsert(girderSection.labels, white, layout.layer));
          // let gridMark = GridMarkView(girderStation[i], scale, initPoint, rotate, layout, i + 1)
          // gridMark.meshes.forEach(function (mesh) {
          //     mesh.position.set(0, -i * girderOffset, 0);
          //     group.add(mesh);
          // });
          // let label = LabelInsert(gridMark.labels, white, layout.layer)
          // label.position.set(0, -i * girderOffset, 0);
          // group.add(label)
      }
      return group
  }

  // export function sideDraw(steelBoxDict, hBracing, diaDict, vstiffDict, gridPoint, initPoint) {
  //     let group = new THREE.Group();

  //     const hBracingDict = hBracing.hBracingDict
  //     const hBracingPlateDict = hBracing.hBracingPlateDict

  //     let sc = 0.500;
  //     let r = Math.PI - Math.atan((gridPoint["G1K6"].y - gridPoint["G1K1"].y) / (gridPoint["G1K6"].x - gridPoint["G1K1"].x))
  //     let aqua = new THREE.MeshBasicMaterial({ color: 0x00ffff });   // white 0xffffff
  //     let green = new THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff


  //     // let side = GeneralSideView(steelBoxDict, ["G1LeftWeB"], 4, 0, 1, sc, initPoint, r, aqua)
  //     // side.forEach(function (mesh) { group.add(mesh) });

  //     let textMesh;
  //     let textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff
  //     let label = [];

  //     var loader = new THREE.FontLoader();
  //     loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
  //         // console.log(font)
  //         // var font = {generateShapes:(messagem , num)=>{}}
  //         for (let i in label) {
  //             var shapes = font.generateShapes(label[i].text, label[i].fontSize);
  //             var geometry = new THREE.ShapeBufferGeometry(shapes);
  //             var xMid
  //             geometry.computeBoundingBox();
  //             xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
  //             geometry.translate(xMid, -label[i].fontSize / 2, 0);
  //             if (label[i].rotation) {
  //                 geometry.rotateZ(label[i].rotation)
  //             }
  //             geometry.translate(label[i].anchor[0], label[i].anchor[1], 0);
  //             // make shape ( N.B. edge view not visible )
  //             textMesh = new THREE.Mesh(geometry, textMaterial);
  //             textMesh.layers.set(1)
  //             group.add(textMesh);
  //         }
  //         // text.position.z = 0;
  //     });

  //     return group
  // }




  function LineMesh$1(point0, lineMaterial, z) {
      let points = [];
      let z1 = z ? z : 0;
      for (let i in point0) {
          points.push(new global.THREE.Vector3(point0[i].x, point0[i].y, z1));
      }
      let geometry = new global.THREE.Geometry().setFromPoints(points);
      let result = new global.THREE.Line(geometry, lineMaterial);
      result.computeLineDistances();
      return result
  }

  function LineSegMesh(point0, lineMaterial, z) {
      let points = [];
      let z1 = z ? z : 0;
      for (let i in point0) {
          points.push(new global.THREE.Vector3(point0[i].x, point0[i].y, z1));
      }
      let geometry = new global.THREE.Geometry().setFromPoints(points);
      let result = new global.THREE.LineSegments(geometry, lineMaterial);
      result.computeLineDistances();
      return result
  }


  function sectionMesh(point0, lineMaterial) {
      let points = [];
      for (let i in point0) {
          points.push(new global.THREE.Vector3(point0[i].x, point0[i].y, 0));
      }
      let geometry = new global.THREE.Geometry().setFromPoints(points);
      return new global.THREE.LineLoop(geometry, lineMaterial)
  }

  function GirderSectionView(deckPointDict, sectionPointDict, girderStation, scale, yoffset) {
      let meshes = [];
      let labels = [];
      let lineMaterial = new global.THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00
      let xoffset = 20000;
      let initZ = [];
      let girderNum = girderStation.length;
      let deck = deckPointDict.filter(obj => obj.key.includes("CRS"));
      let spanNum = deck.length;
      let dims = [];

      // let section = { "uflange": [[], [], []], "lflange": [[], [], []], "web": [[], [], []], "deck": [[], [], []] }
      for (let j = 0; j < spanNum; j++) {
          let webDim = [];
          let heightDim = [];
          for (let i = 0; i < girderNum; i++) {
              let girderPoint = girderStation[i].find(obj => obj.key.includes("G" + (i + 1) + "S" + (j + 1)));
              if (i === 0) { initZ.push(girderPoint.point.z); }
              let offset = girderPoint.point.offset;
              let sectionPoint = sectionPointDict[girderPoint.key];
              for (let key in sectionPoint.forward) {
                  if (key === "uflange" || key === "lflange" || key === "web" || key === "URib" || key === "LRib") {
                      // console.log("check",sectionPoint)
                      for (let k in sectionPoint.forward[key]) {
                          if (sectionPoint.forward[key][k].length > 0) {
                              let pts = [];
                              sectionPoint.forward[key][k].forEach(pt => pts.push(
                                  { x: pt.x + offset + j * xoffset, y: pt.y + yoffset + girderPoint.point.z - initZ[j] }));
                              meshes.push(sectionMesh(pts, lineMaterial));
                              if (key === "web") {
                                  webDim.push(pts[1]);
                                  heightDim = [pts[0], pts[1]];
                              }
                          }
                      }
                  }
              }
              let gpt = { x: offset + j * xoffset, y: yoffset + girderPoint.point.z - initZ[j] - deck[j].slabHeight };
              dims.push(Dimension([heightDim[0], gpt], 1, 1, 1, false, false, 0));

          }
          let deckPt = [];
          deck[j].deckSectionPoint.forEach(pt => deckPt.push({ x: pt.x + j * xoffset, y: pt.y + yoffset - initZ[j] }));
          meshes.push(sectionMesh(deckPt, lineMaterial));

          dims.push(Dimension([deckPt[1], ...webDim, deckPt[3]], 0, 1, 1, true, true, 0));
          dims.push(Dimension([deckPt[1], deckPt[2], deckPt[3]], 0, 1, 1, true, true, 1));
          dims.push(Dimension([deckPt[1], deckPt[3]], 0, 1, 1, true, true, 2));
          dims.push(Dimension([deckPt[0], deckPt[1]], 0, 1, 1, false, false, 1));
          // dims.push(Dimension([heightDim[0], heightDim[1]], 0, 1, 1, false, true,1)) // 각 거더별 형고를 표현해야 하는데, 웹의 높이 출력
      }
      for (let i in dims) {
          meshes.push(...dims[i].meshes);
          labels.push(...dims[i].labels);
      }
      return { meshes, labels }
  }


  function sectionView(sectionName, sectionPoint, diaPoint) { //횡단면도
      // var makerjs = require('makerjs');
      let sc = 1;
      // let sections = {models:{ }};
      // let captions = { models: {} };
      // let weldings = { models: {} };
      let titlePosition = 1000;
      let titleSize = 100;
      // let group = []
      let group = new global.THREE.Group();
      let label = [];
      let textMaterial = new global.THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff
      let lineMaterial = new global.THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00
      // let red = new THREE.LineBasicMaterial({ color: 0xff0000 });    // green 0x00ff00
      // let green = new THREE.LineBasicMaterial({ color: 0x00ff00 });    // green 0x00ff00

      label.push({    //sectiontitle
          text: sectionName,
          anchor: [0, titlePosition, 0],
          fontSize: titleSize
      });

      let circle = new global.THREE.EllipseCurve(0, titlePosition, titleSize * 2.5, titleSize * 2.5);
      let cp = circle.getPoints(16);
      let circlegeo = new global.THREE.Geometry().setFromPoints(cp);
      let titleCircle = new global.THREE.Line(circlegeo, lineMaterial);
      group.add(titleCircle);

      for (var key in sectionPoint) {
          if (key === "uflange" || key === "lflange" || key === "web" || key === "URib" || key === "LRib") {
              // console.log("check",sectionPoint)
              for (let k in sectionPoint[key]) {
                  if (sectionPoint[key][k].length > 0) {
                      group.add(sectionMesh(sectionPoint[key][k], lineMaterial));
                  }
              }
          }
          // if (sectionPoint[key].constructor === Array) {
          //     group.add(sectionMesh(sectionPoint[key], lineMaterial))
          // }
      }

      let diaMesh = DiaSectionMesh(diaPoint, lineMaterial);
      diaMesh.forEach(mesh => group.add(mesh));

      //     if (diaPoint[key].size) {
      //         label.push({
      //             text: diaPoint[key].size.Label,
      //             anchor: [(diaPoint[key].anchor[0][0] + diaPoint[key].anchor[1][0]) / 2, (diaPoint[key].anchor[0][1] + diaPoint[key].anchor[1][1]) / 2, 0],
      //             rotation: Math.atan((diaPoint[key].anchor[1][1] - diaPoint[key].anchor[0][1]) / (diaPoint[key].anchor[1][0] - diaPoint[key].anchor[0][0])),
      //             fontSize: labelSize
      //         })
      //     }
      //     if (diaPoint[key].welding) {
      //         for (let i in diaPoint[key].welding) {
      //             weldings.push(weldingMark(diaPoint[key].welding[i], 0.8, sc, 200, true, true, false, false))
      //         }
      //     }
      let dims = [];
      if (sectionPoint.uflange[0].length >0){
          dims.push(Dimension([sectionPoint.uflange[0][0], sectionPoint.uflange[1][0]], 0, sc, 1, true, true, 2));   //top1
          dims.push(Dimension([sectionPoint.uflange[0][0], sectionPoint.uflange[0][1], sectionPoint.uflange[1][1], sectionPoint.uflange[1][0]], 0, sc, 1, true, true, 1)); //top2
      } else {
          dims.push(Dimension([sectionPoint.uflange[2][0], sectionPoint.uflange[2][1]], 0, sc, 1, true, true, 1));   //top1
      }
      dims.push(Dimension([sectionPoint.web[1][0], sectionPoint.web[1][1]], 1, sc, 1, false, true, 2)); //right1
      // dims.push(Dimension([sectionPoint.rWeb[0], diaPoint.lowerTopShape.points[3], diaPoint.lowerTopShape.points[2], diaPoint.rightTopPlateShape.points[3], diaPoint.rightTopPlateShape.points[0], sectionPoint.rWeb[1]], 5, sc, 1, false, true, 1)) //right2
      dims.push(Dimension([sectionPoint.web[0][0], sectionPoint.web[0][1]], 1, sc, 1, false, false, 2)); //left1
      // dims.push(Dimension([sectionPoint.lWeb[0], diaPoint.lowerTopShape.points[0], diaPoint.lowerTopShape.points[1], diaPoint.leftTopPlateShape.points[3], diaPoint.leftTopPlateShape.points[0], sectionPoint.lWeb[1]], 5, sc, 1, false, false, 1)) // left2
      
      if (sectionPoint.lflange[0].length > 0){
          dims.push(Dimension([sectionPoint.lflange[0][0], sectionPoint.lflange[1][0]], 0, sc, 1, true, false, 3)); //botoom2
          dims.push(Dimension([sectionPoint.lflange[0][0], sectionPoint.web[0][0], sectionPoint.web[1][0], sectionPoint.lflange[1][0]], 0, sc, 1, true, false, 2)); //bottom1
          dims.push(Dimension([sectionPoint.lflange[0][0], sectionPoint.lflange[0][1], sectionPoint.lflange[1][1], sectionPoint.lflange[1][0]], 0, sc, 1, true, false, 1)); //botoom2
      } else {
          dims.push(Dimension([sectionPoint.lflange[2][0], sectionPoint.web[0][0], sectionPoint.web[1][0], sectionPoint.lflange[2][1]], 0, sc, 1, true, false, 1)); //bottom1
          dims.push(Dimension([sectionPoint.lflange[2][0], sectionPoint.lflange[2][1]], 0, sc, 1, true, false, 2)); //botoom2
      }
      // // layer coloers : aqua, black, blue, fuchsia, green, gray, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow

      for (let i in dims) {
          dims[i].meshes.forEach(function (mesh) { group.add(mesh); });
          dims[i].labels.forEach(function (elem) { label.push(elem); });
      }
      // for (let i in weldings) {
      //     weldings[i].meshes.forEach(function (mesh) { group.add(mesh) })
      //     weldings[i].labels.forEach(function (elem) { label.push(elem) })
      // }

      group.add(LabelInsert(label, textMaterial, 1));  //layer number is 1
      return group
  }


  function DiaSectionMesh(diaPoint, lineMaterial) {
      let boltSize = 22; // 추후 외부에서 가져와야함, 20200708 by drlim 
      let boltcircle = new global.THREE.EllipseCurve(0, 0, boltSize / 2, boltSize / 2);
      let boltcp = boltcircle.getPoints(16);
      let boltcirclegeo = new global.THREE.Geometry().setFromPoints(boltcp);


      let red = new global.THREE.LineBasicMaterial({ color: 0xff0000 });    // green 0x00ff00
      let green = new global.THREE.LineBasicMaterial({ color: 0x00ff00 });    // green 0x00ff00

      let meshes = [];
      let pts = [];
      let points = [];
      for (var key in diaPoint) {
          if (diaPoint[key].points2D) {
              meshes.push(sectionMesh(diaPoint[key].points2D, lineMaterial));
              if (diaPoint[key].bolt && diaPoint[key].rotationX === Math.PI / 2) {
                  let cp = { x: (diaPoint[key].points2D[0].x + diaPoint[key].points2D[2].x) / 2, y: (diaPoint[key].points2D[0].y + diaPoint[key].points2D[2].y) / 2 };
                  for (let k in diaPoint[key].bolt.layout) {
                      let x = diaPoint[key].bolt.layout[k][0];
                      let y = diaPoint[key].bolt.layout[k][1];
                      pts.push({ x: cp.x + x, y: cp.y + y });
                  }
              }
          }
          if (diaPoint[key].hole) {
              meshes.push(sectionMesh(diaPoint[key].hole, lineMaterial));
          }
      }
      pts.forEach(function (pt) {
          points.push({ x: pt.x + (boltSize), y: pt.y });
          points.push({ x: pt.x - (boltSize), y: pt.y });
          points.push({ x: pt.x, y: pt.y + (boltSize) });
          points.push({ x: pt.x, y: pt.y - (boltSize) });
          let boltCircle = new global.THREE.Line(boltcirclegeo, green);
          boltCircle.position.set(pt.x, pt.y, 0);
          // boltCircle.translateX(pt.x)
          // boltCircle.translateY(pt.y)
          meshes.push(boltCircle);

      });
      let mesh = LineSegMesh(points, red, 0);
      meshes.push(mesh);
      return meshes
  }


  // 치수선 생성 프로그램 선, caption으로 구성해야할 듯함
  // 다수의 포인트(points)의 연속된 치수선을 생성하는 모듈
  function Dimension(points, index, scale, valueScale, isHorizontal, isTopOrRight, offsetIndex) {
      let lineMaterial = new global.THREE.LineBasicMaterial({ color: 0xff0000 });
      let sign = (isTopOrRight) ? 1 : -1;
      // let dim = {models:{}, paths:{}}
      let add = 200 * scale * sign;
      let fontSize = 80 * scale;
      let extend = 20 * scale * sign;
      let offset = offsetIndex * 200 * scale * sign + 20 * scale * sign;
      // dim.layer = "red"
      let meshes = [];
      let labels = [];
      if (isHorizontal) {
          for (var key in points) {
              meshes.push(LineMesh$1([{ x: points[key].x, y: points[index].y + offset }, { x: points[key].x, y: points[index].y + add + offset + extend }], lineMaterial));
          }
          for (let i = 0; i < points.length - 1; i++) {
              meshes.push(LineMesh$1([{ x: points[i].x, y: points[index].y + add + offset }, { x: points[i + 1].x, y: points[index].y + add + offset }], lineMaterial));
              let value = valueScale * (Math.abs(points[i + 1].x - points[i].x));
              labels.push({
                  text: value.toFixed(0),
                  anchor: [(points[i].x + points[i + 1].x) / 2, points[index].y + add + offset + fontSize, 0],
                  rotation: 0,
                  fontSize: fontSize
              });
          }
      } else {
          for (var key in points) {
              meshes.push(LineMesh$1([{ x: points[index].x + offset, y: points[key].y }, { x: points[index].x + add + offset + extend, y: points[key].y }], lineMaterial));
          }
          for (let i = 0; i < points.length - 1; i++) {
              meshes.push(LineMesh$1([{ x: points[index].x + add + offset, y: points[i].y }, { x: points[index].x + add + offset, y: points[i + 1].y }], lineMaterial));
              let value = valueScale * (Math.abs(points[i + 1].y - points[i].y));
              labels.push({
                  text: value.toFixed(0),
                  anchor: [points[index].x + add + offset - fontSize, (points[i].y + points[i + 1].y) / 2, 0],
                  rotation: Math.PI / 2,
                  fontSize: fontSize
              });
          }
      }
      return { meshes, labels }
  }

  // import { LineToThree } from "../line/module";

  function SectionViewer(){
    this.addInput("sectionName","arr");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("diaDict","diaDict");
    this.addInput("layOut","number");
  }

  SectionViewer.prototype.onExecute = function() {
  };

  SectionViewer.prototype.on3DExecute = function() {
    let gridlist = this.getInputData(0); //["G1D1", "G1D2", "G1D10"];
    let sectionPointDict = this.getInputData(1);
    let diaDict = this.getInputData(2);
  //   let svgAll = { models: {} };
    let i = 0;
    let offset = 5000;
    const metaData={part:"section"};
    for (let value of gridlist) {
      let sectionPoint = sectionPointDict[value].forward;
      let diaPoint = diaDict[value];
      let group = sectionView(value, sectionPoint, diaPoint);
      // for (let j in group){
      //     
      //     sceneAdder({layer:1, mesh:group[j]},"section" + value + j);
      // }
      group.position.set(i*offset, -5000 * this.getInputData(3),0);
      global.sceneAdder({name:`section${value}`, layer:1, mesh:group, meta:metaData});
      // sceneAdder(group,[1, "section", value]);
      // // svgAll.models[value].origin = [i * offset, 0];
      i += 1;
    }
  };



  function TopViewer(){
    this.addInput("steelBoxDict","steelBoxDict");
    this.addInput("hBracingDict","hBracingDict");
    this.addInput("diaDict","diaDict");
    this.addInput("vstiffDict","diaDict");
    this.addInput("xbeamDict","diaDict");
    this.addInput("gridPoint","gridPoint");
    this.addInput("initPoint","point");
    this.addInput("girderStation","girderStation");
  }

  TopViewer.prototype.onExecute = function() {
  };

  TopViewer.prototype.on3DExecute = function() {
    let offset = 5000;
    let group = topDraw(this.getInputData(0),this.getInputData(1), this.getInputData(2), this.getInputData(3), this.getInputData(4),this.getInputData(5),this.getInputData(6), this.getInputData(7));
    // topDraw(steelBoxDict,hBracingDict, diaDict, vstiffDict, nameToPointDict,initPoint)
    group.position.set(0,-offset,0);
    global.sceneAdder({name:"topView", layer:6, mesh:group, meta:{part:"topView"}});

    // sceneAdder(group,[6, "topView", "total"]);
  };

  function GirderGeneralView1(){
    this.addInput("girderStation","girderStation");
    this.addInput("layout","layout");
  }

  GirderGeneralView1.prototype.onExecute = function() {
  };

  GirderGeneralView1.prototype.on3DExecute = function() {
    let group = GirderGeneralDraw1(this.getInputData(0),this.getInputData(1));
    global.sceneAdder({name:"GirderGeneralView1", layer:this.getInputData(1).layer, mesh:group, meta:{part:"GirderGeneralView"}});
    // sceneAdder({layer:this.getInputData(1).layer, mesh:group},"GirderGeneralView1");
    // sceneAdder(group, [this.getInputData(1), "GirderGeneralView1", "total"] );
  };

  function GirderGeneralView2(){
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("girderStation","girderStation");
    this.addInput("steelBoxDict","steelBoxDict");
    this.addInput("deckPointDict","deckPointDict");
    this.addInput("layout","layout");
  }

  GirderGeneralView2.prototype.onExecute = function() {
  };

  GirderGeneralView2.prototype.on3DExecute = function() {
    let group = GirderGeneralDraw2(this.getInputData(0),this.getInputData(1),this.getInputData(2), this.getInputData(3), this.getInputData(4));
    global.sceneAdder({name:"GirderGeneralView2", layer:this.getInputData(4).layer, mesh:group, meta:{part:"GirderGeneralView"}});

    // sceneAdder({layer:this.getInputData(4).layer, mesh:group},"GirderGeneralView2");
    // sceneAdder(group, [this.getInputData(4), "GirderGeneralView2", "total"]);
  };


  function PartGeneralView(){
    this.addInput("diaDict","diaDict");
    this.addInput("girderStation","girderStation");
    this.addInput("layout","layout");
    this.addInput("key","string");
  }

  PartGeneralView.prototype.onExecute = function() {
  };

  PartGeneralView.prototype.on3DExecute = function() {
    let group = PartGeneralDraw(this.getInputData(0),this.getInputData(1),this.getInputData(2));
    let layer = this.getInputData(2).layer;
    let key = this.getInputData(3);
    // console.log("check", layer,key)
    global.sceneAdder({name:`${key}`, layer:layer, mesh:group, meta:{part:`${key}`}});

    // sceneAdder({layer:layer, mesh:group},key);
    // sceneAdder(group, [this.getInputData(4), "GirderGeneralView2", "total"]);
  };


  function XbeamGeneralView(){
    this.addInput("diaDict","diaDict");
    this.addInput("girderStation","girderStation");
    this.addInput("layout","layout");
    this.addInput("key","string");
  }

  XbeamGeneralView.prototype.onExecute = function() {
  };

  XbeamGeneralView.prototype.on3DExecute = function() {
    let group = XbeamSection(this.getInputData(0),this.getInputData(1),this.getInputData(2));
    let layer = this.getInputData(2).layer;
    let key = this.getInputData(3);
    // console.log("check", layer,key)
    global.sceneAdder({name:`${key}`, layer:layer, mesh:group, meta:{part:`${key}`}});

    // sceneAdder({layer:layer, mesh:group},key);
    // sceneAdder(group, [this.getInputData(4), "GirderGeneralView2", "total"]);
  };


  // export function SideViewer(){
  //   this.addInput("steelBoxDict","steelBoxDict");
  //   this.addInput("hBracingDict","hBracingDict");
  //   this.addInput("diaDict","diaDict");
  //   this.addInput("vstiffDict","diaDict");
  //   this.addInput("gridPoint","gridPoint");
  //   this.addInput("initPoint","point");
  // }

  // SideViewer.prototype.onExecute = function() {
  // }

  // SideViewer.prototype.on3DExecute = function() {
  //   let offset = 15000;
  //   let group = sideDraw(this.getInputData(0),this.getInputData(1), this.getInputData(2), this.getInputData(3), this.getInputData(4),this.getInputData(5))
  //   // topDraw(steelBoxDict,hBracingDict, diaDict, vstiffDict, nameToPointDict,initPoint)
  //   group.position.set(0,-offset,0)
  //   sceneAdder({layer:1, mesh:group},"SideView");
  // };

  function LineDraw(){
    this.addInput("masterLine","line");
    this.addInput("slaveLine","line");
  }

  LineDraw.prototype.onExecute = function() {
  };

  LineDraw.prototype.on3DExecute = function() {
    let group = LineDrawView(this.getInputData(0),this.getInputData(1));
    global.sceneAdder({name:"LineView", layer:3, mesh:group, meta:{part:"LineView"}});

    // sceneAdder({layer:3, mesh:group},"LineView")
    // sceneAdder(group, [3, "LineView", "total"])
  };

  function LineSideDraw(){
    this.addInput("masterLine","line");
  }

  LineSideDraw.prototype.onExecute = function() {
  };

  LineSideDraw.prototype.on3DExecute = function() {
    let group = LineSideView(this.getInputData(0));
    global.sceneAdder({name:"LineSideView", layer:4, mesh:group, meta:{part:"LineSideView"}});

    // sceneAdder({layer:4, mesh:group},"LineSideView")
    // sceneAdder(group, [4, "LineSideView", "total"]);
  };

  function GirderLayoutDraw(){
    this.addInput("girderLayout","girderLayout");
  }

  GirderLayoutDraw.prototype.onExecute = function() {
  };

  GirderLayoutDraw.prototype.on3DExecute = function() {
    let group = GirderLayoutView(this.getInputData(0));
    global.sceneAdder({name:"GirderLayout", layer:3, mesh:group.plan, meta:{part:"GirderLayout"}});
    global.sceneAdder({name:"GirderLayoutSide", layer:4, mesh:group.side, meta:{part:"GirderLayoutSide"}});

    // sceneAdder({layer:3, mesh:group.plan},"GirderLayout")
    // sceneAdder({layer:4, mesh:group.side},"GirderLayoutSide")
    // sceneAdder(group.plan, [3, "GirderLayout", "total"])
    // sceneAdder(group.side, [4, "GirderLayoutSide", "total"])
  };

  function partProperty(width, thickness, Dy, Dz, cos) {
      // cos는 수직부재 1, 수평부재 0
      const sin = Math.sqrt(1 - cos ** 2);
      let area = width * thickness;
      let Ioyy = width * thickness / 12 * ((width * cos) ** 2 + (thickness * sin) ** 2);
      let Iozz = width * thickness / 12 * ((width * sin) ** 2 + (thickness * cos) ** 2);
      return { area, Ioyy, Iozz, Dy, Dz }
  }

  //I형 가로보의 시공단계별 단면계수 생성
  function Isection(xi, materials) { //, slab

      let stage1 = {};
      let stage2 = {};
      let stage3 = {};
      let n1 = materials[2][1] / materials[0][1];  //상부바닥판 탄성계수비
      let isteel = [];
      let tfw = xi[0];
      let tft = xi[1];
      let bfw = xi[2];
      let bft = xi[3];
      let wh = xi[4];
      let wt = xi[5];
      isteel.push(partProperty(tfw, tft, wh / 2 + tft / 2, 0, 0));
      isteel.push(partProperty(bfw, bft, -wh / 2 - bft / 2, 0, 0));
      isteel.push(partProperty(wh, wt, 0, 0, 1));

      //합성전 강재 단면
      let ADy = 0;
      let ADz = 0;

      stage1.A = 0;
      for (let i in isteel) {
          stage1.A += isteel[i].area;
          ADy += isteel[i].area * isteel[i].Dy;
          ADz += isteel[i].area * isteel[i].Dz;
      }
      stage1.Cy = ADy / stage1.A;
      stage1.Cz = ADz / stage1.A;
      stage1.Iyy = 0;
      stage1.Izz = 0;
      stage1.Ixx = 0;  // 추후 비틀림 강성에 대한 값을 계산하여야 함
      for (let i in isteel) {
          stage1.Iyy += isteel[i].Ioyy + isteel[i].area * (isteel[i].Dy - stage1.Cy) ** 2;
          stage1.Izz += isteel[i].Iozz + isteel[i].area * (isteel[i].Dz - stage1.Cz) ** 2;
      }
      // 단일 합성후 가로보단면 변화 없음
      stage2 = stage1;
      //이중합성후 합성단면의 단면계수 계산
      stage3 = stage1;

      // let deckConc = partProperty(slab.W / n1, slab.T, wh / 2 + slab.T / 2 + slab.Th, 0, 0)
      // isteel.push(deckConc)
      // ADy += deckConc.area * deckConc.Dy
      // ADz += deckConc.area * deckConc.Dz
      // stage3.A = stage2.A + deckConc.area;
      // stage3.Cy = ADy / stage3.A
      // stage3.Cz = ADz / stage3.A
      // stage3.Iyy = 0;
      // stage3.Izz = 0;
      // stage3.Ixx = 0; // 추후 비틀림 강성에 대한 값을 계산하여야 함
      // for (let i in isteel) {
      //     stage3.Iyy += isteel[i].Ioyy + isteel[i].area * (isteel[i].Dy - stage3.Cy) ** 2
      //     stage3.Izz += isteel[i].Iozz + isteel[i].area * (isteel[i].Dz - stage3.Cz) ** 2
      // }

      return [stage1, stage2, stage3]
  }
  //이중합성 거더의 시공단계별 단면계수 생성
  function DCBsection(sa, materials) {
      let n1 = materials[2][1] / materials[0][1];  //상부바닥판 탄성계수비
      let n2 = materials[2][1] / materials[1][1];  //하부콘크리트 탄성계수비
      let lcos = sa.H / Math.sqrt(sa.H ** 2 + ((sa.B2 - sa.B1) / 2) ** 2);
      let rcos = lcos;
      let sb = [];

      if (sa.isClosedTop) {
          sb.push(partProperty(sa.wuf, sa.tuf, sa.H / 2 + sa.tuf / 2, sa.B2 / 2, 0));
          sb.push(partProperty(sa.wuf, sa.tuf, sa.H / 2 + sa.tuf / 2, -sa.B2 / 2, 0));
      } else {
          sb.push(partProperty(sa.wuf, sa.tuf, sa.H / 2 + sa.tuf / 2, 0, 0));
      }
      sb.push(partProperty(sa.wlf, sa.tlf, -sa.H / 2 - sa.tlf / 2, 0, 0));
      sb.push(partProperty(sa.wlw, sa.tw, 0, -(sa.B2 + sa.B1) / 4, lcos));
      sb.push(partProperty(sa.wrw, sa.tw, 0, (sa.B2 + sa.B1) / 4, rcos));
      sa.Urib.layout.forEach(function (elem) {
          sb.push(partProperty(sa.Urib.height, sa.Urib.thickness, sa.H / 2 - sa.Urib.height / 2, elem, 1));
      });
      sa.Lrib.layout.forEach(function (elem) {
          sb.push(partProperty(sa.Lrib.height, sa.Lrib.thickness, -sa.H / 2 + sa.Lrib.height / 2, elem, 1));
      });
      let stage1 = {};
      let stage2 = {};
      let stage3 = {};

      //비틀림 강성 계산을 위한 수평브레이싱 등가 두께 계산

      if (sa.isClosedTop === false) {
          let hb = sa.horizontal_bracingbracing;
          let bracing_length = Math.Sqrt(hb.d0 ** 2 + sa.B2 ** 2);
          //tr = material.Steel.elast / material.Steel.shear_elast * .lamda * .B2 / (bracing_length ^ 3 / .horizontal_bracing.Area + 2 / 3 * .B2 / (.b_2 * .t2))
          let tr = materials[2][1] / materials[2][2] * hb.d0 * sa.B2 / (bracing_length ** 3 / hb.dbArea + 2 / 3 * sa.B2 / (sa.wuf * sa.tuf)); //<--- 임시로 작성
          stage1.Ixx = 4 * ((sa.B2 + sa.B1) * sa.H / 2) ** 2 / (sa.B2 / tr + sa.wlw / sa.tw + sa.wrw / sa.tw + sa.B1 / sa.tlf);
      } else {
          stage1.Ixx = 4 * ((sa.B2 + sa.B1) * sa.H / 2) ** 2 / (sa.B2 / sa.tuf + sa.wlw / sa.tw + sa.wrw / sa.tw + sa.B1 / sa.tlf);
      }
      //가로보 시공 후 또는 바닥판 타설후 비틀림 강성은 의미가 없으므로, 해석시에는 합성전후 거더의 비틀림강성이 동일하다고 가정한다.
      stage2.Ixx = stage1.Ixx;
      stage3.Ixx = stage1.Ixx;

      //합성전 강재 단면
      let ADy = 0;
      let ADz = 0;

      stage1.A = 0;
      for (let i in sb) {
          stage1.A += sb[i].area;
          ADy += sb[i].area * sb[i].Dy;
          ADz += sb[i].area * sb[i].Dz;
      }
      stage1.Cy = ADy / stage1.A;
      stage1.Cz = ADz / stage1.A;
      stage1.Iyy = 0;
      stage1.Izz = 0;
      for (let i in sb) {
          stage1.Iyy += sb[i].Ioyy + sb[i].area * (sb[i].Dy - stage1.Cy) ** 2;
          stage1.Izz += sb[i].Iozz + sb[i].area * (sb[i].Dz - stage1.Cz) ** 2;
      }

      //단일합성후 합성단면의 단면계수 계산
      let botConc = partProperty(sa.B1 / n2, sa.Tcl, -sa.H / 2 + sa.Tcl / 2, 0, 0);
      sb.push(botConc);
      if (sa.isDoubleComposite === false) {
          stage2 = stage1;
      } else {
          ADy += botConc.area * botConc.Dy;
          ADz += botConc.area * botConc.Dz;
          stage2.A = stage1.A + botConc.area;
          stage2.Cy = ADy / stage2.A;
          stage2.Cz = ADz / stage2.A;
          stage2.Iyy = 0;
          stage2.Izz = 0;
          for (let i in sb) {
              stage2.Iyy += sb[i].Ioyy + sb[i].area * (sb[i].Dy - stage2.Cy) ** 2;
              stage2.Izz += sb[i].Iozz + sb[i].area * (sb[i].Dz - stage2.Cz) ** 2;
          }
      }
      //이중합성후 합성단면의 단면계수 계산
      let deckConc = partProperty(sa.B3 / n1, sa.Tcu, sa.H / 2 + sa.Tcu / 2 + sa.Th, 0, 0);
      sb.push(deckConc);
      ADy += deckConc.area * deckConc.Dy;
      ADz += deckConc.area * deckConc.Dz;
      stage3.A = stage2.A + deckConc.area;
      stage3.Cy = ADy / stage3.A;
      stage3.Cz = ADz / stage3.A;
      stage3.Iyy = 0;
      stage3.Izz = 0;
      for (let i in sb) {
          stage3.Iyy += sb[i].Ioyy + sb[i].area * (sb[i].Dy - stage3.Cy) ** 2;
          stage3.Izz += sb[i].Iozz + sb[i].area * (sb[i].Dz - stage3.Cz) ** 2;
      }
      return [stage1, stage2, stage3]
  }

  function SupportGenerator(supportFixed, supportData, gridPoint, sectionPointDict) {
      let data = {};
      let model = {};
      let girderHeight = 2000;    //임시로 2000이라고 가정함. 추후 girderSection정보로부터 받아올수 있도록 함.
      let fixedPoint = [];
      let isFixed = false;
      let angle = 0;
      let sign = 1;
      let type = "";
      let name = "";
      let point = {};
      let width = 0;
      let height = 0;
      let thickness = 0;

      const dof = {
          고정단: [true, true, true, false, false, false],
          양방향단: [false, false, true, false, false, false],
          횡방향가동: [true, false, true, false, false, false],
          종방향가동: [false, true, true, false, false, false],
      };
      let fixedCoord = { x: 0, y: 0, z: 0 };
      // 고정단기준이 체크되지 않거나, 고정단이 없을 경우에는 접선방향으로 받침을 계산함
      if (supportFixed) {
          fixedPoint = supportData.filter(function (value) { return value[1] == '고정단' });
      }
      if (fixedPoint.length > 0) {
          isFixed = true;
          let fixed = gridPoint[fixedPoint[0].point];
          girderHeight = - sectionPointDict[fixed].forward.lflangeSide[1];
          let skew = fixed.skew * Math.PI / 180;
          let offset = fixedPoint[0].offset;
          fixedCoord = {
              x: fixed.x - (Math.cos(skew) * (-1) * fixed.normalSin - Math.sin(skew) * fixed.normalCos) * offset,
              y: fixed.y - (Math.sin(skew) * (-1) * fixed.normalSin + Math.cos(skew) * fixed.normalCos) * offset,
              z: fixed.z - girderHeight
          };
      }

      for (let index in supportData) {
          name = supportData[index][0]; //.point
          type = supportData[index][1]; //.type
          width = supportData[index][3];
          height = supportData[index][4];
          thickness = supportData[index][5];

          let offset = supportData[index][2]; //.offset
          point = gridPoint[name];
          girderHeight = - sectionPointDict[name].forward.lflangeSide[1];
          // console.log(name, point)
          let skew = point.skew * Math.PI / 180;
          let newPoint = {
              x: point.x - (Math.cos(skew) * (-1) * point.normalSin - Math.sin(skew) * point.normalCos) * offset,
              y: point.y - (Math.sin(skew) * (-1) * point.normalSin + Math.cos(skew) * point.normalCos) * offset,
              z: point.z - girderHeight,
              offset : point.offset + offset
          };
          if (isFixed && name !== fixedPoint[0].point) {

              if (name.slice(2) === fixedPoint[0].point.slice(2)) {
                  angle = Math.atan2(newPoint.y - fixedCoord.y, newPoint.x - fixedCoord.x) + Math.PI / 2;
              } else {
                  angle = Math.atan2(newPoint.y - fixedCoord.y, newPoint.x - fixedCoord.x);
              }
          } else {
              sign = point.normalCos >= 0 ? 1 : -1;
              angle = sign * Math.acos(-point.normalSin);
          }
          data[index] = {
              angle: angle > Math.PI / 2 ? angle - Math.PI : angle < - Math.PI / 2 ? angle + Math.PI : angle,
              point: newPoint,
              basePointName: name,
              key: "SPPT" + index,
              type: dof[type], //[x,y,z,rx,ry,rz]
              solePlateThck : thickness,
          };

          let  pointAng = Math.atan2(-point.normalSin, point.normalCos);
          let dA = data[index].angle - pointAng;
          let cos = Math.cos(dA);
          let sin = Math.sin(dA);
          let tan = point.gradientX;
          let points1 = [
              {x: - cos * width /2 - sin * height /2, y: - sin * width /2 + cos * height /2, z: - thickness},
              {x: - cos * width /2 + sin * height /2, y: - sin * width /2 - cos * height /2, z: - thickness},
              {x: cos * width /2 + sin * height /2, y: sin * width /2 - cos * height /2, z: - thickness},
              {x: cos * width /2 - sin * height /2, y: sin * width /2 + cos * height /2, z: - thickness},
          ];
          let points2 = [];
          points1.forEach(point => points2.push({x:point.x, y: point.y, z: point.z + thickness + point.y * tan}));
          let newPoints = [[],[]];
          let nCos = Math.cos(pointAng);
          let nSin = Math.sin(pointAng);
          points1.forEach(point => newPoints[1].push({x:newPoint.x + point.x * nCos - point.y * nSin , y: newPoint.y + point.x*nSin + point.y*nCos, z: newPoint.z + point.z}));
          points2.forEach(point => newPoints[0].push({x:newPoint.x + point.x * nCos - point.y * nSin , y: newPoint.y + point.x*nSin + point.y*nCos, z: newPoint.z + point.z}));
          model["solePlate" + index] = {points : newPoints};
      }
      return { data, model}

  }
  /**
  <summary>
  각 요소별 포함하고 있는 노드의 리스트를 출력 및 sap.s2k 인풋결과 출력을 하며, 동시에 받침점에 대한 Local angle을 정의함
  </summary>
  <param name="girder_point_dict"></param>
  <param name="xbeam_info"></param>
  <param name="stringer_info"></param>
  <returns></returns>
  **/
  function CompositeJointGen(nodeInput, nodeNumDict, deckLineDict) {
      let node = nodeInput.node;
      let local = nodeInput.local;
      let boundary = nodeInput.boundary;
      let rigid = nodeInput.rigid;
      let newDict = nodeNumDict;
      let nodeNum = node.data.length + 1;
      let dummycoord = [-1, -1, -1];


      for (let i in deckLineDict)
          for (let j in deckLineDict[i]) {
              let x = deckLineDict[i][j].point.x;
              let y = deckLineDict[i][j].point.y;
              let z = deckLineDict[i][j].point.z;
              if (dummycoord[0] !== x ||
                  dummycoord[1] !== y ||
                  dummycoord[2] !== z) {
                  newDict[deckLineDict[i][j].key] = nodeNum;
                  node.data.push({ nodeNum: nodeNum, coord: [x, y, z] });
                  nodeNum++;
                  dummycoord = [x, y, z];
              }
          }
      return { nodeNumDict: newDict, input: { node, local, boundary, rigid } }
  }

  function SapJointGenerator(girderStation, supportNode, xbeamData) {//girder_layout, girder_point_dict, xbeam_info, stringer_info, support_data, all_beam_Section_info){
      let nodeNum = 1;
      let node = { command: "JOINT", data: [] };
      let local = { command: "LOCAL", data: [] };
      let boundary = { command: "RESTRAINT", data: [] };
      let rigid = { command: "CONSTRAINT", data: [] };
      let nodeNumDict = {};
      let dummycoord = [-1, -1, -1];

      for (let i in girderStation) {
          for (let j in girderStation[i]) {

              nodeNumDict[girderStation[i][j].key] = nodeNum;
              if (dummycoord[0] !== girderStation[i][j].point.x ||
                  dummycoord[1] !== girderStation[i][j].point.y ||
                  dummycoord[2] !== girderStation[i][j].point.z) {
                  node.data.push({ nodeNum: nodeNum, coord: [girderStation[i][j].point.x, girderStation[i][j].point.y, girderStation[i][j].point.z] });
                  nodeNum++;
                  dummycoord = [girderStation[i][j].point.x, girderStation[i][j].point.y, girderStation[i][j].point.z];
              }
          }
      }
      // let supportNode = SupportGenerator(supportFixed, supportData, gridPoint) // <-- 추후 함수 밖으로 보내야함
      for (let i in supportNode) {
          node.data.push({ nodeNum: nodeNum, coord: [supportNode[i].point.x, supportNode[i].point.y, supportNode[i].point.z] });
          nodeNumDict[supportNode[i].key] = nodeNum;
          local.data.push({ nodeNum: nodeNum, ANG: supportNode[i].angle });
          boundary.data.push({ nodeNum: nodeNum, DOF: supportNode[i].type });
          // rigid.data.push({ master: nodeNumDict[supportNode[i].basePointName], 
          //     slave: [nodeNumDict[supportNode[i].key]] }) //해당 결과가 sap에서 에러가 없는지 확인필요함.
          nodeNum++;
      }
      //xbeamData = [{inode:"key1", jnode:"key2",key : "X01", isKframe : true, data:[]}];
      for (let i in xbeamData) {
          if (xbeamData[i].isKframe) {
              for (let j in xbeamData[i].data) {
                  node.data.push({ nodeNum: nodeNum, coord: [xbeamData[i].data[j].x, xbeamData[i].data[j].y, xbeamData[i].data[j].z] });
                  nodeNumDict[xbeamData[i].key + "P" + j] = nodeNum;
                  nodeNum++;
              }
              let rigidIndex = rigid.data.findIndex(elem => elem.master === nodeNumDict[xbeamData[i].inode]);
              if (rigidIndex > -1) {
                  rigid.data[rigidIndex].slave.push(nodeNumDict[xbeamData[i].key + "P0"], nodeNumDict[xbeamData[i].key + "P3"]);
              } else {
                  rigid.data.push({ master: nodeNumDict[xbeamData[i].inode], slave: [nodeNumDict[xbeamData[i].key + "P0"], nodeNumDict[xbeamData[i].key + "P3"]] });
              }
              rigidIndex = rigid.data.findIndex(elem => elem.master === nodeNumDict[xbeamData[i].jnode]);
              if (rigidIndex > -1) {
                  rigid.data[rigidIndex].slave.push(nodeNumDict[xbeamData[i].key + "P1"], nodeNumDict[xbeamData[i].key + "P2"]);
              } else {
                  rigid.data.push({ master: nodeNumDict[xbeamData[i].jnode], slave: [nodeNumDict[xbeamData[i].key + "P1"], nodeNumDict[xbeamData[i].key + "P2"]] });
              }

          } else { //i형 가로보
              for (let j in xbeamData[i].data) {
                  node.data.push({ nodeNum: nodeNum, coord: [xbeamData[i].data[j].x, xbeamData[i].data[j].y, xbeamData[i].data[j].z] });
                  nodeNumDict[xbeamData[i].key + "P" + j] = nodeNum;
                  nodeNum++;
              }
              let rigidIndex = rigid.data.findIndex(elem => elem.master === nodeNumDict[xbeamData[i].inode]);
              if (rigidIndex > -1) {
                  rigid.data[rigidIndex].slave.push(nodeNumDict[xbeamData[i].key + "P0"]);
              } else {
                  rigid.data.push({ master: nodeNumDict[xbeamData[i].inode], slave: [nodeNumDict[xbeamData[i].key + "P0"]] });
              }
              rigidIndex = rigid.data.findIndex(elem => elem.master === nodeNumDict[xbeamData[i].jnode]);
              if (rigidIndex > -1) {
                  rigid.data[rigidIndex].slave.push(nodeNumDict[xbeamData[i].key + "P1"]);
              } else {
                  rigid.data.push({ master: nodeNumDict[xbeamData[i].jnode], slave: [nodeNumDict[xbeamData[i].key + "P1"]] });
              }
          }


      }
      // xbeam stringer에 대한 절점 추가 입력 필요
      // stringerLayout input 추가 필요
      return { nodeNumDict, input: { node, local, boundary, rigid } }
  }
  // 합성전단계에 대해서 일단 우선 생성
  // stringer/외측빔에 대한 단면정보 생성은 추후 결정
  function AllSectionGenerator(girderStation, sectionPointDict, materials, xbeamData) {
      let sectionPropDict = {};
      for (let i in girderStation) {
          for (let j in girderStation[i]) {
              let key = girderStation[i][j].key;
              let sa = sectionPointDict[key].forward.input;
              let sa2 = sectionPointDict[key].backward.input;
              sectionPropDict[key] = { forward: {}, backward: {} };
              sectionPropDict[key].forward = DCBsection(sa, materials);
              sectionPropDict[key].backward = DCBsection(sa2, materials);
          }
      }
      for (let i in xbeamData) {
          if (xbeamData[i].isKframe === false) {
              // let slab = { W: 2000, T: 270, Th: 0 } //추후 자동으로 계산되어야 함 20.04.01 by dr.lim
              let key = xbeamData[i].key;
              sectionPropDict[key] = Isection(xbeamData[i].section, materials); //, slab
          }
      }
      return sectionPropDict;
  }
  function SectionCompare(section1, section2) {
      let result = true;
      result = section1.A === section2.A && section1.Ixx && section2.Ixx && section1.Iyy === section2.Iyy
          && section1.Izz === section2.Izz ? true : false;
      return result
  }

  // const gridModelL = [
  //     ["G1K1", "G2K1", "G3K1"],
  //     ["G1K6", "G2K6", "G3K6"],
  //     ["G1S1", "G2S1", "G3S1"],
  //     ["G1S2", "G2S2", "G3S2"],
  //     ["G1S3", "G2S3", "G3S3"],
  //     ["G1S4", "G2S4", "G3S4"],
  //     ["G1D1", "G2D1", "G3D1"],
  //     ["G1D2", "G2D2", "G3D2"],
  //     ["G1D3", "G2D3", "G3D3"],
  //     ["G1D4", "G2D4", "G3D4"],
  //     ["G1D5", "G2D5", "G3D5"],
  //     ["G1D6", "G2D6", "G3D6"],
  //     ["G1D8", "G2D8", "G3D8"],
  //     ["G1D11", "G2D11", "G3D11"],
  //     ["G1D13", "G2D13", "G3D13"],
  //     ["G1D14", "G2D14", "G3D14"],
  //     ["G1D15", "G2D15", "G3D15"],
  //     ["G1D16", "G2D16", "G3D16"],
  //     ["G1D17", "G2D17", "G3D17"],
  //     ["G1D19", "G2D19", "G3D19"],
  //     ["G1D22", "G2D22", "G3D22"],
  //     ["G1D24", "G2D24", "G3D24"],
  //     ["G1D25", "G2D25", "G3D25"],
  //     ["G1D26", "G2D26", "G3D26"],
  //     ["G1D27", "G2D27", "G3D27"],
  //     ["G1D28", "G2D28", "G3D28"],
  //     ["G1D29", "G2D29", "G3D29"]
  // ];

  function CompositeFrameGen(nodeNumDict, frameInput, deckLineDict, sectionPointDict, gridPoint, slabInfo, gridModelL) { //gridModelData, xbeamData, 
      // let allElement = []; // As New List(Of Element_3d)
      // let sectionNameDict = {}
      let frame = frameInput.frame;
      let section = frameInput.section;
      let material = frameInput.material;
      let selfWeight = frameInput.selfWeight;
      let slabWeight = { command: "LOAD", type: "Distributed Span", Name: "sb", data: [] };
      let pavement = { command: "LOAD", type: "Distributed Span", Name: "pv", data: [] };
      let barrier = { command: "LOAD", type: "Concentrated Span", Name: "br", data: [] };
      let laneList = [];
      let elemNum = frame.data.length + 1;
      let w1 = slabInfo.w1; //헌치돌출길이
      let hh = slabInfo.haunchHeight; //헌치높이

      section.data.generalSectionList.push({ NAME: "dummy", Mat: material.data[0].NAME, A: 1000, I: [1000000, 1000000], J: 1000000 });
      section.data.generalSectionList.push({ NAME: "slab", Mat: material.data[0].NAME, A: 270000, I: [1640250000, 1640250000], J: 1640250000 }); //temparary



      const barrierInfo = [{ isLeft: true, offset: 180, area: 200000 }, { isLeft: false, offset: 180, area: 200000 }];
      const pavementInfo = [{ isLeft: [true, false], offset: [450, 450], thickness: 80 }];
      const laneData = [{ baseLine: "leftDeck", offset: 2250 }, { baseLine: "leftDeck", offset: 5850 }];
      for (let i in laneData) {
          laneList.push([]); //차선수만큼 리스트 개수 확보
      }
      

      for (let i in deckLineDict) {
          for (let j = 0; j < deckLineDict[i].length - 1; j++) {
              let inode = deckLineDict[i][j].key;
              let jnode = deckLineDict[i][j + 1].key;
              let elem = {
                  iNode: nodeNumDict[inode],
                  jNode: nodeNumDict[jnode],
                  sectionName: "dummy", // node_group.Key & added_index,
                  endOffset: false,
                  number: elemNum
              };
              frame.data.push(elem);
              elemNum++;
          }
      }
      let pNum = 1;
      let nextPoints = [];
      let nextNode = [];
      let nextLeftDeck = {};
      let nextRightDeck = {};
      let brB = [];
      if (gridModelL) {
          gridModelL.sort(function (a, b) { return gridPoint[a[0]].masterStationNumber < gridPoint[b[0]].masterStationNumber ? -1 : 1; });
          for (let i = 0; i < gridModelL.length; i++) {
              let barrierOffset = [];
              let pavementOffset = [];
              let laneOffset = [];
              let currentNode = [];
              let currentPoints = [];
              let leftDeck = {};
              let rightDeck = {};
              let ivecF = [];
              let br = [];
              let brF = [];

              if (i === 0) {
                  leftDeck = deckLineDict[0].find(elem => elem.key === "LD" + gridModelL[i][0].substr(2));
                  rightDeck = deckLineDict[1].find(elem => elem.key === "RD" + gridModelL[i][gridModelL[i].length - 1].substr(2));
                  currentPoints.push(leftDeck.point);
                  gridModelL[i].forEach(elem => currentPoints.push(gridPoint[elem]));
                  currentPoints.push(rightDeck.point);
                  currentNode = ["LD" + gridModelL[i][0].substr(2), ...gridModelL[i], "RD" + gridModelL[i][gridModelL[i].length - 1].substr(2)];
              } else {
                  currentPoints = [...nextPoints];
                  leftDeck = nextLeftDeck;
                  rightDeck = nextRightDeck;
                  currentNode = nextNode;
              }
              if (i < gridModelL.length - 1) {
                  nextNode = ["LD" + gridModelL[i + 1][0].substr(2), ...gridModelL[i + 1], "RD" + gridModelL[i + 1][gridModelL[i + 1].length - 1].substr(2)];
                  nextLeftDeck = deckLineDict[0].find(elem => elem.key === "LD" + gridModelL[i + 1][0].substr(2));
                  nextRightDeck = deckLineDict[1].find(elem => elem.key === "RD" + gridModelL[i + 1][gridModelL[i].length - 1].substr(2));
                  nextPoints = [nextLeftDeck.point];
                  gridModelL[i + 1].forEach(elem => nextPoints.push(gridPoint[elem]));
                  nextPoints.push(nextRightDeck.point);
                  let elemUnitVec = [];
                  for (let k = 0; k < currentPoints.length - 1; k++) {
                      let elemL = Math.sqrt((currentPoints[k + 1].x - currentPoints[k].x) ** 2 + (currentPoints[k + 1].y - currentPoints[k].y) ** 2);
                      elemUnitVec.push([(currentPoints[k + 1].x - currentPoints[k].x) / elemL, (currentPoints[k + 1].y - currentPoints[k].y) / elemL]);
                      ivecF = [nextPoints[k].x - currentPoints[k].x, nextPoints[k].y - currentPoints[k].y];
                      brF.push(Math.abs(ivecF[0] * elemUnitVec[k][1] - ivecF[1] * elemUnitVec[k][0]));
                      if (k === currentPoints.length - 2) {
                          ivecF = [nextPoints[k + 1].x - currentPoints[k + 1].x, nextPoints[k + 1].y - currentPoints[k + 1].y];
                          brF.push(Math.abs(ivecF[0] * elemUnitVec[k][1] - ivecF[1] * elemUnitVec[k][0]));
                      }
                  }
              }

              if (i === 0) {
                  brF.forEach(elem => br.push(elem / 2 * 2.5 * 9.81 * 0.000001));
              } else if (i === gridModelL.length - 1) {
                  brB.forEach(elem => br.push(elem / 2 * 2.5 * 9.81 * 0.000001));
              } else {
                  for (let k in brF) {
                      br.push((brF[k] + brB[k]) / 2 * 2.5 * 9.81 * 0.000001);
                  }
              }
              if (i < gridModelL.length - 1) {
                  brB = brF;
              }

              for (let k in barrierInfo) {
                  barrierOffset.push(barrierInfo[k].isLeft ? currentPoints[0].offset + barrierInfo[k].offset : currentPoints[currentPoints.length - 1].offset - barrierInfo[k].offset);
              }
              for (let k in pavementInfo) {
                  pavementOffset.push([pavementInfo[k].isLeft[0] ? currentPoints[0].offset + pavementInfo[k].offset[0] : currentPoints[currentPoints.length - 1].offset - pavementInfo[k].offset[0],
                  pavementInfo[k].isLeft[1] ? currentPoints[0].offset + pavementInfo[k].offset[1] : currentPoints[currentPoints.length - 1].offset - pavementInfo[k].offset[1]]);
              }
              for (let k in laneData) {
                  if (laneData[k].baseLine === "leftDeck") {
                      laneOffset.push(currentPoints[0].offset + laneData[k].offset);
                  } else if (laneData[k].baseLine === "rightDeck") {
                      laneOffset.push(currentPoints[currentPoints.length - 1].offset - laneData[k].offset);
                  } // 거더에 대한 모든 기준 포인트가 저장되어야 함.
              }

              for (let j = 0; j < currentPoints.length - 1; j++) {
                  let inode = currentNode[j];
                  let jnode = currentNode[j + 1];

                  let elem = {
                      iNode: nodeNumDict[inode],
                      jNode: nodeNumDict[jnode],
                      sectionName: "slab", // node_group.Key & added_index,
                      endOffset: false,
                      number: elemNum
                  };
                  let xList = [];
                  let wList = [];
                  let inc = 1;
                  frame.data.push(elem);

                  let leftPoint = currentPoints[j];
                  let rightPoint = currentPoints[j + 1];
                  let L = rightPoint.offset - leftPoint.offset;
                  if (j === 0) {
                      let slabThickness2 = sectionPointDict[jnode].forward.input.Tcu;
                      let gradient = sectionPointDict[jnode].forward.input.gradient;
                      let x1 = sectionPointDict[jnode].forward.uflange[2].length > 0 ? sectionPointDict[jnode].forward.uflange[2][0].x : sectionPointDict[jnode].forward.uflange[0][0].x - w1;
                      xList = [0, (L + x1) / L, 1];
                      wList = [leftDeck.endT, slabThickness2 + hh + (- gradient + rightPoint.gradientY) * x1, slabThickness2 + hh];
                  } else if (j === gridModelL[i].length) {
                      let slabThickness1 = sectionPointDict[inode].forward.input.Tcu;
                      let gradient = sectionPointDict[inode].forward.input.gradient;
                      let x1 = sectionPointDict[inode].forward.uflange[2].length > 0 ? sectionPointDict[inode].forward.uflange[2][1].x : sectionPointDict[inode].forward.uflange[1][0].x + w1;
                      xList = [0, x1 / L, 1];
                      wList = [slabThickness1 + hh, slabThickness1 + hh + (- gradient + leftPoint.gradientY) * x1, rightDeck.endT];
                  } else {
                      let slabThickness1 = sectionPointDict[inode].forward.input.Tcu;
                      let slabThickness2 = sectionPointDict[jnode].forward.input.Tcu;
                      let gradient1 = sectionPointDict[inode].forward.input.gradient;
                      let gradient2 = sectionPointDict[jnode].forward.input.gradient;
                      let x1 = sectionPointDict[inode].forward.uflange[2].length > 0 ? sectionPointDict[inode].forward.uflange[2][1].x : sectionPointDict[inode].forward.uflange[1][0].x + w1;
                      let x2 = sectionPointDict[jnode].forward.uflange[2].length > 0 ? sectionPointDict[jnode].forward.uflange[2][0].x : sectionPointDict[jnode].forward.uflange[0][0].x - w1;
                      let h1 = x1 + 3 * Math.abs(hh + (- gradient1 + leftPoint.gradientY) * x1);
                      let h2 = x2 - 3 * Math.abs(hh + (- gradient2 + rightPoint.gradientY) * x2);
                      xList = [0, x1 / L, h1 / L, (L + h2) / L, (L + x2) / L, 1];
                      wList = [slabThickness1 + hh, slabThickness1 + hh + (- gradient1 + leftPoint.gradientY) * x1, slabThickness1, slabThickness2, slabThickness2 + hh + (- gradient2 + rightPoint.gradientY) * x2, slabThickness2 + hh];
                      if (hh === 0 && gradient1 === leftPoint.gradientY) { inc = 5; }
                  }
                  for (let k = 0; k < xList.length - 1; k += inc) {
                      slabWeight.data.push({
                          elem: elemNum, RD: [xList[k], xList[k + inc]],
                          Uzp: [-1 * wList[k] * ((1 - xList[k]) * br[j] + xList[k] * br[j + 1]), -1 * wList[k + inc] * ((1 - xList[k + inc]) * br[j] + xList[k + inc] * br[j + 1])]
                      });
                  }
                  for (let k in barrierOffset) {
                      if (currentPoints[j].offset <= barrierOffset[k] && currentPoints[j + 1].offset >= barrierOffset[k]) {
                          let x1 = (barrierOffset[k] - currentPoints[j].offset) / L;
                          barrier.data.push({ elem: elemNum, RD: x1, Uz: -1 * barrierInfo[k].area * ((1 - x1) * br[j] + x1 * br[j + 1]) });
                      }
                  }
                  for (let k in pavementOffset) {
                      let x1 = 1;
                      let x2 = 0;
                      if (currentPoints[j].offset <= pavementOffset[k][0] && currentPoints[j + 1].offset >= pavementOffset[k][0]) {
                          x1 = (pavementOffset[k][0] - currentPoints[j].offset) / L;
                      } else if (currentPoints[j].offset > pavementOffset[k][0]) {
                          x1 = 0;
                      }
                      if (currentPoints[j].offset <= pavementOffset[k][1] && currentPoints[j + 1].offset >= pavementOffset[k][1]) {
                          x2 = (pavementOffset[k][1] - currentPoints[j].offset) / L;
                      } else if (currentPoints[j + 1].offset < pavementOffset[k][1]) {
                          x2 = 1;
                      }
                      if (x2 > x1) {
                          pavement.data.push({
                              elem: elemNum, RD: [x1, x2],
                              Uzp: [-1 * pavementInfo[k].thickness * ((1 - x1) * br[j] + x1 * br[j + 1]),
                              -1 * pavementInfo[k].thickness * ((1 - x2) * br[j] + x2 * br[j + 1])]
                          });
                      }
                  }

                  for (let k in laneData) {
                      if (currentPoints[j].offset <= laneOffset[k] && currentPoints[j + 1].offset >= laneOffset[k]) {
                          let x1 = (laneOffset[k] - currentPoints[j].offset) / L;
                          let name = "LN" + (k * 1 + 1) + "P" + pNum;
                          laneList[k].push(name); //향후 차륜의 개수만큼 확장가능함. by drlim, 200625
                          pNum++;

                      }
                  }
                  elemNum++;
              }
          }
      }
      // console.log("new", frameInput.girderElemList)
      // return { frame, section, material, selfWeight, slabWeight, pavement, barrier, ...lane, laneList, girderElemList : frameInput.girderElemList }
      return { frameInput: { frame, section, material, selfWeight, slabWeight, pavement, barrier }, girderElemList: frameInput.girderElemList }
  }


  function SapFrameGenerator(girderStation, sectionPointDict, xbeamData, supportNode, nodeNumDict, materials, sectionDB) {//consStep, all_material, girder_section_info, all_beam_section_info){
      let step = 0;
      let allElement = []; // As New List(Of Element_3d)
      let elemNum = 1; // As Integer = 1
      // let sectionNameDict = {}
      let material = { command: "MATERIAL", data: [] };
      for (let i in materials) {
          material.data.push({
              NAME: materials[i][0],
              IDES: "C", // 강재는 S, concrte C
              M: materials[i][4] / 9.81 / 1000,  // ton to kN <-- 추후 수정필요
              W: materials[i][4] / 1000, // ton to kg
              E: materials[i][1] * 1,
              U: materials[i][3] * 1
          });
      }

      let sectionPropDict = AllSectionGenerator(girderStation, sectionPointDict, materials, xbeamData);
      let selfWeight = { command: "LOAD", type: "Distributed Span", Name: "StBox", data: [] };
      let sectionNum = 1;
      let tsectionNum = 1;
      let generalSectionList = [];
      let taperedSectionList = [];
      let girderElemList = [];

      for (let i in girderStation) {
          let tempSection = { name: "temp", A: 0, Ixx: 0, Iyy: 0, Izz: 0 };
          for (let j = 0; j < girderStation[i].length - 1; j++) {
              let inode = girderStation[i][j].key;
              let jnode = girderStation[i][j + 1].key;
              if (nodeNumDict[inode] !== nodeNumDict[jnode]) {
                  let sectionName = "noname"; // 임시로 작성 추후 수정 바람.
                  let section1 = sectionPropDict[inode].forward[step];
                  let section2 = sectionPropDict[jnode].backward[step];
                  if (SectionCompare(tempSection, section1)) {
                      if (SectionCompare(section1, section2)) {
                          sectionName = tempSection.name;
                          section2["name"] = sectionName;
                      }
                      else {
                          sectionName = "t" + tsectionNum;
                          tsectionNum++;
                          generalSectionList.push({ NAME: sectionNum, Mat: materials[2][0], A: section2.A, I: [section2.Iyy, section2.Izz], J: section2.Ixx });
                          section2["name"] = sectionNum;
                          taperedSectionList.push({
                              Name: sectionName,
                              type: "Nonpr",
                              Sec: [tempSection.name, sectionNum],  //isection, jsection
                              Eivar: [2, 1],  //EI variation 1: linear, 2: parabola, 3: cubic {EI22, EI33}
                              Vl: 1
                          });
                          sectionNum++;
                      }
                  }
                  else {
                      if (SectionCompare(section1, section2)) {
                          sectionName = sectionNum;
                          generalSectionList.push({ NAME: sectionNum, Mat: materials[2][0], A: section1.A, I: [section1.Iyy, section1.Izz], J: section1.Ixx });
                          section2["name"] = sectionNum;
                          sectionNum++;
                      } else {
                          sectionName = "t" + tsectionNum;
                          tsectionNum++;
                          generalSectionList.push({ NAME: sectionNum, Mat: materials[2][0], A: section1.A, I: [section1.Iyy, section1.Izz], J: section1.Ixx });
                          sectionNum++;
                          generalSectionList.push({ NAME: sectionNum, Mat: materials[2][0], A: section2.A, I: [section2.Iyy, section2.Izz], J: section2.Ixx });
                          taperedSectionList.push({
                              Name: sectionName,
                              type: "Nonpr",
                              Sec: [sectionNum - 1, sectionNum],  //isection, jsection
                              Eivar: [2, 1],  //EI variation 1: linear, 2: parabola, 3: cubic {EI22, EI33}
                              Vl: 1
                          });
                          section2["name"] = sectionNum;
                          sectionNum++;
                      }

                  }
                  tempSection = section2;
                  // sectionNameDict[sectionName] = [sectionPropDict[inode].forward, sectionPropDict[jnode].backward]
                  let elem = {
                      iNode: nodeNumDict[inode],
                      jNode: nodeNumDict[jnode],
                      sectionName: sectionName, // node_group.Key & added_index,
                      endOffset: false,
                      number: elemNum
                  };
                  girderElemList.push(elemNum);
                  allElement.push(elem);
                  let p1 = -1 * section1.A * material.data[2].W;   //materials : steel
                  let p2 = -1 * section2.A * material.data[2].W;   //materials : steel
                  selfWeight.data.push({ elem: elemNum, RD: [0, 1], Uzp: [p1, p2] });
                  elemNum++;

              }
          }
      }
      let DBSectionList = [];
      //xbeamData = [{inode:"key1", jnode:"key2",key : "X01", isKframe : true, data:[], section:[상형,하현,사재]}];
      for (let i in xbeamData) {
          if (xbeamData[i].isKframe) {
              let KLink = [[0, 1], [2, 4], [3, 4], [0, 4], [1, 4]]; // 상현, 하현1, 하현2, 사재1, 사재2
              xbeamData[i].section.forEach(function (elem) {
                  if (DBSectionList.includes(elem) === false) {
                      DBSectionList.push(elem);
                  }
              });
              let sectionName = [xbeamData[i].section[0], xbeamData[i].section[1], xbeamData[i].section[1], xbeamData[i].section[2], xbeamData[i].section[2]];
              for (let j = 0; j < 5; j++) {
                  let inode = xbeamData[i].key + "P" + KLink[j][0];
                  let jnode = xbeamData[i].key + "P" + KLink[j][1];
                  let elem = {
                      iNode: nodeNumDict[inode],
                      jNode: nodeNumDict[jnode],
                      sectionName: sectionName[j], // node_group.Key & added_index,
                      endOffset: false,
                      number: elemNum
                  };
                  allElement.push(elem);
                  elemNum++;
              }
          } else { //일반 I형 가로보
              let sectionName = xbeamData[i].key; // 임시로 작성 추후 수정 바람.
              let section1 = sectionPropDict[xbeamData[i].key][step];
              generalSectionList.push({ NAME: sectionName, Mat: materials[2][0], A: section1.A, I: [section1.Iyy, section1.Izz], J: section1.Ixx });
              // sectionNameDict[sectionName] = [sectionPropDict[sectionName]]  //가로보는 변단면 반영하지 않음.
              let elem = {
                  iNode: nodeNumDict[xbeamData[i].key + "P0"],
                  jNode: nodeNumDict[xbeamData[i].key + "P1"],
                  sectionName: sectionName, // node_group.Key & added_index,
                  endOffset: false, // 강역 고려하지 않고  rigidbody 로 계산
                  number: elemNum,
                  // IOFF: xbeamData[i].data[0],
                  // JOFF: xbeamData[i].data[1]
              };
              allElement.push(elem);
              elemNum++;
          }
      }

      DBSectionList.forEach(function (elem) {
          let section1 = sectionDB[elem];
          generalSectionList.push({ NAME: elem, Mat: materials[2][0], A: section1.A, I: [section1.Iyy, section1.Izz], J: section1.Ixx });
      });

      generalSectionList.push({ NAME: "rigid", Mat: materials[2][0], A: 1000000000, I: [10000000000, 10000000000], J: 10000000000 });

      for (let i in supportNode) {
          let elem = {
              iNode: nodeNumDict[supportNode[i].basePointName],
              jNode: nodeNumDict[supportNode[i].key],
              sectionName: "rigid", // node_group.Key & added_index,
              endOffset: false,
              number: elemNum,
          };
          allElement.push(elem);
          elemNum++;
      }

      // deck, stringer  추후 작성
      // sectionDB운용방안 마련
      //    const materials = {
      //     slabConc: { name: "slabConc", elast: 28825.3, shearElast: 12318.5, poissonRatio: 0.17 w : 25}, // 강도와 재료 입력으로 자동생성
      //     bottomConc: { name: "lowerConc", elast: 31209.5, shearElast: 13337.4, poissonRatio: 0.17 },
      //     Steel: { name: "steelBox", elast: 210000, shearElast: 81000, poissonRatio: 0.3 },
      //     rebar: { name: "rebar", elast: 200000, shearElast: 80000, poissonRatio: 0.3 },
      // }


      let frame = { command: "FRAME", data: allElement };
      let section = { command: "FRAME SECTION", data: { generalSectionList, taperedSectionList } };
      return { sectionPropDict, input: { frame, section, material, selfWeight, girderElemList }, }
  }

  function Support() {
      this.addInput("supportFixed", "boolean");
      this.addInput("supportLayout", "arr");
      this.addInput("gridPoint", "gridPoint");
      this.addInput("sectionPointDict", "sectionPointDict");
      this.addOutput("supportdata", "supportdata");
      this.addOutput("model", "model");
  }

  Support.prototype.onExecute = function () {
      const result = SupportGenerator(this.getInputData(0), this.getInputData(1), this.getInputData(2),this.getInputData(3));
      this.setOutputData(0, result.data);
      this.setOutputData(1, result.model);
  };

  function SapJoint() {
      this.addInput("girderStation", "girderStation");
      this.addInput("supportData", "supportData");
      this.addInput("xbeamData", "xbeamData");
      this.addOutput("nodeNumDict", "nodeNumDict");
      this.addOutput("nodeInput", "nodeInput");
  }

  SapJoint.prototype.onExecute = function () {
      const result = SapJointGenerator(this.getInputData(0), this.getInputData(1), this.getInputData(2));
      this.setOutputData(0, result.nodeNumDict);
      this.setOutputData(1, result.input);
  };

  function SapFrame() {
      this.addInput("girderStation", "girderStation");
      this.addInput("sectionPointDict", "sectionPointDict");
      this.addInput("xbeamData", "xbeamData");
      this.addInput("supportData", "supportData");
      this.addInput("nodeNumDict", "nodeNumDict");
      this.addInput("materials", "arr");
      this.addInput("sectionDB", "sectionDB");
      this.addOutput("sectionPropDict", "sectionPropDict");
      this.addOutput("frameInput", "frameInput");
  }

  SapFrame.prototype.onExecute = function () {
      const result = SapFrameGenerator(this.getInputData(0), this.getInputData(1), this.getInputData(2),this.getInputData(3),this.getInputData(4),this.getInputData(5),this.getInputData(6));
      this.setOutputData(0, result.sectionPropDict);
      this.setOutputData(1, result.input);
  };


  function CompositeJoint() {
      this.addInput("nodeInput", "nodeInput");
      this.addInput("nodeNumDict", "nodeNumDict");
      this.addInput("deckLineDict", "deckLineDict");
      this.addOutput("nodeNumDict", "nodeNumDict");
      this.addOutput("nodeInput", "nodeInput");
  }

  CompositeJoint.prototype.onExecute = function () {
      const result = CompositeJointGen(this.getInputData(0), this.getInputData(1), this.getInputData(2));
      this.setOutputData(0, result.nodeNumDict);
      this.setOutputData(1, result.input);
  };

  function CompositeFrame() {
      this.addInput("nodeNumDict", "nodeNumDict");
      this.addInput("frameInput", "frameInput");
      this.addInput("deckLineDict", "deckLineDict");
      this.addInput("sectionPointDict", "sectionPointDict");
      this.addInput("gridPoint", "gridPoint");
      this.addInput("slabInfo", "slabInfo");
      this.addInput("gridModel", "arr");
      this.addOutput("frameInput", "frameInput");
      this.addOutput("girderElemList", "girderElemList");
  }

  CompositeFrame.prototype.onExecute = function () {
      const result = CompositeFrameGen(this.getInputData(0), this.getInputData(1),this.getInputData(2),this.getInputData(3),this.getInputData(4),this.getInputData(5),this.getInputData(6));
      this.setOutputData(0, result.frameInput);
      this.setOutputData(1, result.girderElemList);
  };

  function SectionDB() {
      this.addOutput("sectionDB", "sectionDB");
  }

  SectionDB.prototype.onExecute = function () {
      //T형강일 경우, 역T를 기준으로 하단좌측이 원점, y축 수평, z축 수직
      //L형강일 경우, ㄴ자를 기준으로 하단좌측이 원점, y축 수평, z축 수직
      const result = {
          "T150x150x6.5x9": { type: "T", shape: [150, 150, 6.5, 9], A: 2266.5, Ixx: 122669.3, Iyy: 4598193, Izz: 2534477, Cy: 75, Cz: 34.8276 },
          "L100x100x10": { type: "L", shape: [100, 100, 10, 10], A: 1900, Ixx: 63300, Iyy: 1750000, Izz: 1750000, Cy: 28.2, Cz: 28.2 },
          "L150x150x12": { type: "L", shape: [150, 150, 12, 12], A: 3477, Ixx: 166000, Iyy: 7400000, Izz: 7400000, Cy: 41.4, Cz: 41.4 }
      };
      this.setOutputData(0, result);
  };

  function SplicePart() {
      this.addInput("spliceLayout","spliceLayout");
      this.addInput("spliceSectionList","spliceSectionList");
      this.addInput("gridPoint","gridPoint");
      this.addInput("sectionPointDict","sectionPointDict");
      this.addOutput("diaDict", "diaDict");
  }

  SplicePart.prototype.onExecute = function () {
      //T형강일 경우, 역T를 기준으로 하단좌측이 원점, y축 수평, z축 수직
      //L형강일 경우, ㄴ자를 기준으로 하단좌측이 원점, y축 수평, z축 수직
      let gridPoint = this.getInputData(2);    let sectionPointDict = this.getInputData(3);
      let spliceDict = {};
      for (let key in gridPoint) {
          if (key.includes("SP")) {
            spliceDict[key] = SplicePlate(gridPoint[key], sectionPointDict[key].forward);
          }
        }
      
      this.setOutputData(0, spliceDict);
  };

  function BarrierSectionPoint(
      masterLine,
      centerLineStations,
      slabInfo,
      slabLayout,
      pointDict
    ){
      // slabLayout object to list 
      
      const position = 0;

      const T = 1;
      // const leftOffset = 3;
      // const rightOffset =4;

      let leftBarrier = [];
      let rightBarrier = [];
      let slabThickness = slabInfo.slabThickness;
      let haunch = slabInfo.haunchHeight;
      let endT = 0;
      let leftOffset = 0;
      let rightOffset = 0;
      for (let i = 1; i < centerLineStations.length - 1; i++) {
        
        let masterPoint = centerLineStations[i].point;
        let masterStation = masterPoint.masterStationNumber;
        //deckSectionInfo로 분리예정
        for (let j = 0; j < slabLayout.length - 1; j++) {
          let ss = pointDict[slabLayout[j][position]].masterStationNumber;
          let es = pointDict[slabLayout[j + 1][position]].masterStationNumber;
          if (masterStation >= ss && masterStation <= es) {
            let x = masterStation - ss;
            let l = es - ss;
            leftOffset = slabLayout[j][3] * (l - x) / l + slabLayout[j + 1][3] * (x) / l;
            rightOffset = slabLayout[j][4] * (l - x) / l + slabLayout[j + 1][4] * (x) / l;
            // slabThickness = slabLayout[j].H * (l - x) / l + slabLayout[j + 1].H * (x) / l
            endT = slabLayout[j][T] * (l - x) / l + slabLayout[j + 1][T] * (x) / l;
          }
        }
        //deckSectionInfo로 분리예정
        for (let k = 0; k<2;k++){
          let offset = k===0? leftOffset:rightOffset;
          let sign = k ===0? 1:-1;
          let l1 = OffsetPoint(masterPoint, masterLine, offset + sign*10);
          let l2 = OffsetPoint(masterPoint, masterLine, offset + sign*250);
          let l3 = OffsetPoint(masterPoint, masterLine, offset + sign*320);
          let l4 = OffsetPoint(masterPoint, masterLine, offset + sign*450);
          let points = [ZMove(l4,0),
                              ZMove(l4,200),
                              ZMove(l3, 380),
                              ZMove(l2, 1350),
                              ZMove(l1, 1350),
                              ZMove(l1,0),];
          if (k===0){
            leftBarrier.push({name:masterStation, points:points.reverse()}); // 추후 순서를 뒤집어서 작성 필요
          }else {
            rightBarrier.push({name:masterStation, points:points.reverse()});
          }
        }
      }
      // leftBarrier.sort(function (a, b) { return a.name < b.name ? -1 : 1; })
      // rightBarrier.sort(function (a, b) { return a.name < b.name ? -1 : 1; })
      return {leftBarrier, rightBarrier }
    }

  function BarrierPoint(){
      this.addInput("masterLine","line");
      this.addInput("centerLineStation","centerLineStation");
      this.addInput("slabInfo","slabInfo");
      this.addInput("slabLayout","arr");
      this.addInput("pointDict","pointDict");
      this.addOutput("BarrierPointDict","DeckPointDict");
    }

    BarrierPoint.prototype.onExecute = function(){
      this.setOutputData(0,BarrierSectionPoint(
          this.getInputData(0),
          this.getInputData(1),
          this.getInputData(2),
          this.getInputData(3),
          this.getInputData(4)
        ));
    };

  function DeckRebarPoint(
      masterLine,
      pointDict,
      deckSection,
      slabInfo,
      slabLayout,
      rebar1,
      rebar2,
      rebar11
  ) {
      let type = 1;
      let Var = 2;
      let leftCover = 3;
      let rightCover = 4;
      let isUpper = 5;
      let cover = 6;
      let spacing = 7;
      let start = 10;
      let end = 11;
      let startOffset = 12;
      let endOffset = 13;

      let r1 = [];
      let r2 = [];
      for (let rNum in rebar1) {
          let left1 = {};
          let right1 = {};
          let sp = pointDict[rebar1[rNum][start]];
          let ep = pointDict[rebar1[rNum][end]];
          let station = sp.masterStationNumber + rebar1[rNum][startOffset];
          let zOffset = 0; //slabInfo.slabThickness + slabInfo.haunchHeight
          while (station <= ep.masterStationNumber + rebar1[rNum][endOffset]) {
              let mp1 = MasterPointGenerator(station, masterLine);
              // let mp2 = MasterPointGenerator(ep.masterStationNumber + rebar1[0].endOffset,masterLine);

              for (let i = 0; i < slabLayout.length - 1; i++) {
                  let ss = pointDict[slabLayout[i][0]].masterStationNumber;
                  let es = pointDict[slabLayout[i + 1][0]].masterStationNumber;
                  if (mp1.masterStationNumber >= ss && mp1.masterStationNumber <= es) {
                      let x = mp1.masterStationNumber - ss;
                      let l = es - ss;
                      let leftOffset = slabLayout[i][3] * (l - x) / l + slabLayout[i + 1][3] * (x) / l;
                      let rightOffset = slabLayout[i][4] * (l - x) / l + slabLayout[i + 1][4] * (x) / l;
                      let slabThickness = slabLayout[i][2] * (l - x) / l + slabLayout[i + 1][2] * (x) / l;
                      let z = rebar1[rNum][isUpper] ? zOffset - rebar1[rNum][cover] : zOffset - slabThickness + rebar1[rNum][cover];
                      left1 = OffsetPoint(mp1, masterLine, leftOffset + rebar1[rNum][leftCover]);
                      right1 = OffsetPoint(mp1, masterLine, rightOffset - rebar1[rNum][rightCover]);
                      if (rebar1[rNum][type] === "C") {
                          r1.push([ZMove(left1, zOffset - slabThickness + rebar1[rNum][Var][0]),
                          ZMove(left1, z), ZMove(mp1, z), ZMove(right1, z),
                          ZMove(right1, zOffset - slabThickness + rebar1[rNum][Var][0]),
                          ]);
                      } else {
                          r1.push([ZMove(left1, z), ZMove(mp1, z), ZMove(right1, z),]);
                      }
                      break;
                  }
              }
              station += rebar1[rNum][spacing];
              //   iter ++;
              //   if (iter>100){break;}
          }
      }

      let tSlab = [];
      let bSlab = [];
      deckSection.forEach(function(elem){
          tSlab.push({name : elem.name, points : elem.slabUpperPoints});
          bSlab.push({name : elem.name, points : elem.slabLowerPoints});
      });

      for (let rNum in rebar2) {
          let bPts = [];
          let lrebar = [];
          let slabLine = rebar2[rNum][isUpper] ? tSlab : bSlab;
          let sp = pointDict[rebar2[rNum][start]].masterStationNumber;
          let ep = pointDict[rebar2[rNum][end]].masterStationNumber;
          let cov = rebar2[rNum][isUpper] ? -rebar2[rNum][cover] : rebar2[rNum][cover];
          slabLine.forEach(function (elem) {
              if (elem.name >= sp && elem.name <= ep) {
                  bPts.push(ZOffsetLine(elem.points, cov));
              }
          });
          
          // console.log(ZOffsetLine(deckSection.slab2[18].points,70))
          let iMax = bPts.length - 1;
          let spt = longiRebarEndPoints(bPts[0], bPts[1], rebar2[rNum][startOffset], true);
          let ept = longiRebarEndPoints(bPts[iMax - 1], bPts[iMax], rebar2[rNum][endOffset], false);
          lrebar.push(InterPolation2(spt, rebar2[rNum][spacing], rebar2[rNum][leftCover], rebar2[rNum][rightCover], rebar2[rNum][Var]));
          for (let i = 1; i < iMax; i++) {
              lrebar.push(InterPolation2(bPts[i], rebar2[rNum][spacing], rebar2[rNum][leftCover], rebar2[rNum][rightCover], rebar2[rNum][Var]));
          }
          lrebar.push(InterPolation2(ept, rebar2[rNum][spacing], rebar2[rNum][leftCover], rebar2[rNum][rightCover], rebar2[rNum][Var]));
          for (let i = 0; i < lrebar[0].length; i++) {
              let pts = [];
              for (let j = 0; j < lrebar.length; j++) {
                  if (lrebar[j][i]){
                      pts.push(lrebar[j][i]);
                   }
              }
              r2.push(pts);
          }
      }


      let isLeft = 3;
      let isRight = 4;
      spacing = 5;
      start = 8;
      end = 9;
      startOffset = 10;
      endOffset = 11;


      for (let rNum in rebar11) {
          let sp = pointDict[rebar11[rNum][start]];
          let ep = pointDict[rebar11[rNum][end]];
          let station = sp.masterStationNumber + rebar11[rNum][startOffset];
          let zOffset = 0; //slabInfo.slabThickness + slabInfo.haunchHeight
          while (station <= ep.masterStationNumber + rebar11[rNum][endOffset]) {
              let mp1 = MasterPointGenerator(station, masterLine);
              // let mp2 = MasterPointGenerator(ep.masterStationNumber + rebar1[0].endOffset,masterLine);
              for (let i = 0; i < slabLayout.length - 1; i++) {
                  let ss = pointDict[slabLayout[i][0]].masterStationNumber;
                  let es = pointDict[slabLayout[i + 1][0]].masterStationNumber;
                  if (mp1.masterStationNumber >= ss && mp1.masterStationNumber <= es) {
                      let x = mp1.masterStationNumber - ss;
                      let l = es - ss;
                      let leftOffset = slabLayout[i][3] * (l - x) / l + slabLayout[i + 1][3] * (x) / l;
                      let rightOffset = slabLayout[i][4] * (l - x) / l + slabLayout[i + 1][4] * (x) / l;
                      let slabThickness = slabLayout[i][2] * (l - x) / l + slabLayout[i + 1][2] * (x) / l;
                      let endT = slabLayout[i][1] * (l - x) / l + slabLayout[i + 1][1] * (x) / l;
                      if (rebar11[rNum][isLeft]) {
                          let rebarPts = [];
                          let offset = 0;
                          for (let j = 2; j < rebar11[rNum][Var].length; j++) {
                              offset += rebar11[rNum][Var][j];
                              rebarPts.push(OffsetPoint(mp1, masterLine, leftOffset + offset));
                          }
                          r1.push([ZMove(rebarPts[0], zOffset - endT + rebar11[rNum][Var][0]),
                          ZMove(rebarPts[1], zOffset - slabThickness - slabInfo.haunchHeight + rebar11[rNum][Var][0]),
                          ZMove(rebarPts[2], zOffset - slabThickness - slabInfo.haunchHeight + rebar11[rNum][Var][0]),
                          ZMove(rebarPts[3], zOffset - rebar11[rNum][Var][1])]);
                      }
                      if (rebar11[rNum][isRight]) {
                          let rebarPts = [];
                          let offset = 0;
                          for (let j = 2; j < rebar11[rNum][Var].length; j++) {
                              offset += rebar11[rNum][Var][j];
                              rebarPts.push(OffsetPoint(mp1, masterLine, rightOffset - offset));
                          }
                          r1.push([ZMove(rebarPts[0], zOffset - endT + rebar11[rNum][Var][0]),
                          ZMove(rebarPts[1], zOffset - slabThickness - slabInfo.haunchHeight + rebar11[rNum][Var][0]),
                          ZMove(rebarPts[2], zOffset - slabThickness - slabInfo.haunchHeight + rebar11[rNum][Var][0]),
                          ZMove(rebarPts[3], zOffset - rebar11[rNum][Var][1])]);
                      }
                  }
              }
              station += rebar1[rNum].spacing;
          }
      }

      return { r1, r2, }
  }

  //   export function InterPolation(point1, point2, spacing) {
  //     let result = [];
  //     let length = Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
  //     let remainder = length % spacing
  //     let x = 0
  //     for (let i = 0; i < length / spacing; i++) {
  //       result.push({
  //         x: point1.x * (length - x) / length + point2.x * x / length,
  //         y: point1.y * (length - x) / length + point2.y * x / length,
  //         z: point1.z * (length - x) / length + point2.z * x / length
  //       })
  //       x = remainder > 0 && i === 1 ? x + remainder / 2 + spacing / 2 : x + spacing;
  //       result.push(point2)
  //     }

  //     return result
  //   }

  function InterPolation2(points, spacing, leftCover, rightCover, variables) {
      let result = [];
      let distanceList = [0];
      let accLength = 0;
      for (let i = 0; i < points.length - 1; i++) {
          let l = Math.sqrt((points[i + 1].x - points[i].x) ** 2 + (points[i + 1].y - points[i].y) ** 2);
          accLength += l;
          distanceList.push(accLength);
      }

      let W = (accLength - leftCover - rightCover);
      let remainder = W % spacing;

      let x = leftCover;
      for (let i = 0; i < W / spacing + 1; i++) {
          if (variables == false || variables.length === 0 || x <= leftCover + variables[0] || x >= leftCover + W - variables[1]) {
              for (let j = 0; j < distanceList.length - 1; j++) {
                  if (x >= distanceList[j] && x <= distanceList[j + 1]) {
                      let segX = x - distanceList[j];
                      let segL = distanceList[j + 1] - distanceList[j];
                      result.push({
                          x: points[j].x * (segL - segX) / segL + points[j + 1].x * segX / segL,
                          y: points[j].y * (segL - segX) / segL + points[j + 1].y * segX / segL,
                          z: points[j].z * (segL - segX) / segL + points[j + 1].z * segX / segL
                      });
                      break;
                  }
              }
          }
          x = remainder > 0 && (i === 0 || i === Math.floor(W / spacing)) ? x + remainder / 2 + spacing / 2 : x + spacing;
          // result.push(points[points.length-1])
      }
      return result
  }

  function longiRebarEndPoints(startPoints, endPoints, Offset, isStart) {
      let result = [];
      for (let i in startPoints) {

          let segL = Math.sqrt((endPoints[i].x - startPoints[i].x) ** 2 + (endPoints[i].y - startPoints[i].y) ** 2);
          let segX = isStart ? Offset : segL + Offset;
          result.push({
              x: startPoints[i].x * (segL - segX) / segL + endPoints[i].x * segX / segL,
              y: startPoints[i].y * (segL - segX) / segL + endPoints[i].y * segX / segL,
              z: startPoints[i].z * (segL - segX) / segL + endPoints[i].z * segX / segL
          });
      }

      return result
  }

  function DeckRebar() {
      this.addInput("masterLine","masterLine");
      this.addInput("gridPoint","gridPoint");
      this.addInput("deckPointDict","deckPointDict");
      this.addInput("slabInfo","slabInfo");
      this.addInput("slabLayout","arr");
      this.addInput("rebar1","arr");
      this.addInput("rebar2","arr");
      this.addInput("rebar11","arr");
      this.addOutput("deckRebar", "deckRebar");
  }

  DeckRebar.prototype.onExecute = function () {
      let masterLine = this.getInputData(0);
      let pointDict = this.getInputData(1);
      let deckSection = this.getInputData(2);
      let slabInfo = this.getInputData(3);
      let slabLayout = this.getInputData(4);
      let rebar1 = this.getInputData(5);
      let rebar2 = this.getInputData(6);
      let rebar11  = this.getInputData(7);         

      
      this.setOutputData(0, DeckRebarPoint(
          masterLine,
          pointDict,  
          deckSection,
          slabInfo,
          slabLayout,
          rebar1,
          rebar2,
          rebar11
      ));
  };

  // stud의 각 위치좌표를 생성하는 함수
  function StudPoint(girderStation, sectionPointDict, topPlateStudLayout) {
      //1차적으로는 station을 기준으로 배치하고 향후 옵션(곡선교에 대한)을 추가해서, 실간격을 반영할지 여부를 판단할 것임.
      // const topPlateStudLayout = [{
      //     start : "G1K1",
      //     end : "G1SP1",
      //     startOffset : 200,
      //     endOffset : 200,
      //     spacing : 450,

      //     outSideMargin : 100,
      //     inSideMargin : 100,
      //     minNum : 3, //개구부에서부터 간격이 고정되는 스터드의 개수를 의미함
      //     maxNum : 5,
      //     maxDist : 435   //
      // }]

      const studInfo = {
          dia: 25,
          height: 150,
          headDia: 38,
          headDepth: 10,
      };

      let studList = [];
      for (let i in topPlateStudLayout) {
          let ts = {
              start: topPlateStudLayout[i][0],
              end: topPlateStudLayout[i][1],
              startOffset: topPlateStudLayout[i][2],
              endOffset: topPlateStudLayout[i][3],
              spacing: topPlateStudLayout[i][4],
              layout : topPlateStudLayout[i][5],
              // outSideMargin: topPlateStudLayout[i][5],
              // inSideMargin: topPlateStudLayout[i][6],
              // minNum: topPlateStudLayout[i][7],
              // maxNum: topPlateStudLayout[i][8],
              // minDist: 100,  //라이트그래프 인풋변수 수정 필요
              // maxDist: topPlateStudLayout[i][9],
              // layout : [70,105,105]
          };
          let layout = ts.layout.split(',');
          const sp = ts.start;
          let girderIndex = sp.substr(1, 1) * 1 - 1;
          let gridKeys = [];
          let gridPoints = [];
          let cr = false;

          for (let j in girderStation[girderIndex]) {
              if (girderStation[girderIndex][j].key === ts.start) {
                  cr = true;
              }
              if (cr) {
                  gridKeys.push(girderStation[girderIndex][j].key);
                  gridPoints.push(girderStation[girderIndex][j].point);
              }
              if ((girderStation[girderIndex][j].key === ts.end)) {
                  cr = false;
              }
          }
          let totalLength = 0;
          let segLength = 0;
          let gradientY = 0;
          for (let j = 0; j < gridKeys.length - 1; j++) {

              let points = [];
              let spts = [];
              let epts = [];

              for (let p = 0; p < 3; p++) {
                  let startFlangePoints = sectionPointDict[gridKeys[j]].forward.uflange[p];
                  let endFlangePoints = sectionPointDict[gridKeys[j + 1]].backward.uflange[p];
                  if (startFlangePoints.length > 0 && endFlangePoints.length > 0) {
                      gradientY = (startFlangePoints[3].y - startFlangePoints[2].y) / (startFlangePoints[3].x - startFlangePoints[2].x);
                      let startNode = startFlangePoints[3];
                      let endNode = endFlangePoints[3];
                      let sign = p === 1? -1 : 1;
                      // for (let k = 0; k < ts.minNum; k++) {
                      //     let dx = sign * ts.outSideMargin + sign * k * ts.minDist
                      //     spts.push({ x: startNode.x + dx, y: startNode.y + dx * gridPoints[j].gradientY });
                      //     epts.push({ x: endNode.x + dx, y: endNode.y + dx * gridPoints[j + 1].gradientY });
                      // }
                      let dx = 0;
                      for (let k in layout) {
                          let sp = layout[k].trim() * sign;
                          dx += sp;
                          spts.push({ x: startNode.x + dx, y: startNode.y + dx * gradientY });
                          epts.push({ x: endNode.x + dx, y: endNode.y + dx * gradientY });
                      }
                  }
              }


              let globalSpts = [];
              let globalEpts = [];
              spts.forEach(function (elem) { globalSpts.push(ToGlobalPoint(gridPoints[j], elem)); });
              epts.forEach(function (elem) { globalEpts.push(ToGlobalPoint(gridPoints[j + 1], elem)); });
              segLength = Math.sqrt((globalSpts[0].x - globalEpts[0].x) ** 2 + (globalSpts[0].y - globalEpts[0].y) ** 2);
              totalLength += segLength;
              let remainder = (totalLength - ts.startOffset) % ts.spacing;
              let sNum = segLength - remainder > 0 ? Math.floor((segLength - remainder) / ts.spacing) + 1 : 0;

              for (let l = 0; l < spts.length; l++) {
                  for (let k = 0; k < sNum; k++) {
                      let x = 0;
                      if (j < gridKeys.length - 2 || k > 0) {
                          x = remainder + k * ts.spacing;
                      } else {
                          x = ts.endOffset;
                      }
                      points.push({
                          x: x / segLength * globalSpts[l].x + (segLength - x) / segLength * globalEpts[l].x,
                          y: x / segLength * globalSpts[l].y + (segLength - x) / segLength * globalEpts[l].y,
                          z: x / segLength * globalSpts[l].z + (segLength - x) / segLength * globalEpts[l].z
                      });
                  }
              }
              studList.push({ points: points, gradientX: 0, gradientY: gradientY, stud: studInfo });
              // sectionPointDict[gridKeys[j]].backward.leftTopPlate[3]
          }
      }


      return studList
  }

  function Stud(){
      this.addInput("girderStation","girderStation");
      this.addInput("sectionPointDict","sectionPointDict");
      this.addInput("studLayout","arr");
      this.addOutput("studList","studList");
    }
    
    Stud.prototype.onExecute = function() {
      const result = StudPoint(this.getInputData(0), this.getInputData(1), this.getInputData(2));
      this.setOutputData(0, result);
    };

  function partQntt(diaDict) {
      // {
      //     "main": "G1",
      //     "sub": "SEG01",
      //     "name": "web plate",
      //     "w": 1000,
      //     "t": 20,
      //     "l": 2000,
      //     "q": 1,
      //     "wg": 314,
      //     "mat": "HSB500"
      // },
      let data = [];
      for (let key in diaDict) {
          let main = key.substr(0, 2);
          let sub = key.substr(2);
          for (let part in diaDict[key]) {
              if (diaDict[key][part]["points"]) {
                  let points = diaDict[key][part]["points"];
                  let name = part;
                  let t = diaDict[key][part]["Thickness"];
                  let l = 0;
                  let area = 0;
                  let index1 = 0;

                  // 가장 긴 변에 대해서 중심축을 잡음
                  for (let i = 0; i < points.length; i++) {
                      let k = i === points.length - 1 ? 0 : i + 1;
                      let dummyL = lengthPt(points[i], points[k]);
                      if (dummyL > l) {
                          l = dummyL;
                          index1 = i;
                      }
                      area += (points[k].x - points[i].x) * (points[i].y + points[k].y)/2;
                  }
                  let index2 = index1 === points.length - 1 ? 0 : index1 + 1;
                  let ang = -1 * Math.atan2(points[index2].y - points[index1].y, points[index2].x - points[index1].x);
                  let cos = Math.cos(ang);
                  let sin = Math.sin(ang);
                  let xList = [];
                  let yList = [];
                  for (let i = 0; i < points.length; i++) {
                      xList.push(points[i].x * cos - points[i].y * sin);
                      yList.push(points[i].x * sin + points[i].y * cos);
                  }
                  let maxX = Math.max(...xList);
                  let minX = Math.min(...xList);
                  let maxY = Math.max(...yList);
                  let minY = Math.min(...yList);
                  let length = maxX - minX;
                  let width = maxY - minY;
                  let weight = Math.abs(area) * t * 0.000007850;
                  let loss = (length * width - Math.abs(area)) / (length * width) * 100;
                  // 추후 재료에 대한 정보도  part 정보에 추가되어야 함.
                  data.push(
                      {
                          "main": main,
                          "sub": sub,
                          "name": name,
                          "w": width.toFixed(0),
                          "t": t,
                          "l": length.toFixed(0),
                          "q": loss.toFixed(1),
                          "wg": weight.toFixed(1),
                          "mat": "HSB500"
                      }
                  );
              }
          }
      }
      return data
  }

  function lengthPt(pt1, pt2) {
      let length = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2);
      return length
  }

  function MaterialQntt() {
      this.addInput("diaDict", "diaDict");
      this.addOutput("data", "arr");
  }

  MaterialQntt.prototype.onExecute = function () {
      const result = partQntt(this.getInputData(0));
      this.setOutputData(0, result);
  };

  function AbutPointGen(girderLayout, slabLayout) {
      let masterPoint = girderLayout.startPoint;
      let leftOffset = slabLayout[0][3];
      let rightOffset = slabLayout[0][4];
      let leftPoint = ToGlobalPoint(masterPoint, {x:leftOffset, y : masterPoint.leftGradient * leftOffset});//OffsetPoint(masterPoint, masterLine, leftOffset);
      let rightPoint = ToGlobalPoint(masterPoint, {x:rightOffset, y : masterPoint.rightGradient * rightOffset});//OffsetPoint(masterPoint, masterLine, rightOffset);

      let masterPoint1 = girderLayout.endPoint;
      let leftOffset1 = slabLayout[slabLayout.length -1][3];
      let rightOffset1 = slabLayout[slabLayout.length -1][4];
      let leftPoint1 = ToGlobalPoint(masterPoint, {x:leftOffset1, y : masterPoint1.leftGradient * leftOffset1});//OffsetPoint(masterPoint, masterLine, leftOffset);
      let rightPoint1 = ToGlobalPoint(masterPoint, {x:rightOffset1, y : masterPoint1.rightGradient * rightOffset1});//OffsetPoint(masterPoint, masterLine, rightOffset);

      return {start : [leftPoint, masterPoint, rightPoint], end : [leftPoint1, masterPoint1, rightPoint1]}
  }
  function AbutModelGen(abutPoints, abutInput, supportData) {
      let model = {}; // for loftModel
      const tempInput = {
          backWallThick: 800,
          backWallHeight: 2800,
          backHaunchHeight: 600,
          backHaunchThick: 600,
          approachDepth: 300,
          approachHeight: 800,
          supportDepth: 1400,
          ELsub: 18000,
          footHeight: 1600,
          footLengthB: 3700,
          footLengthf: 1600,
          LeanConcT: 100,
          LeanConcL: 100,
          wingWallThick: 800,
          wingLength: 6500,
          wingH1: 1500,
          wingH2: 2600,
          wingL1: 2600,
          wingGradient: 0.02,
          wingHaunch: 300,
      };
      let supportList = [];
      for (let key in supportData) {
          if (supportData[key].basePointName.substr(2, 2) === "S1") {
              supportList.push([supportData[key].point.offset, supportData[key].point.z, supportData[key].solePlateThck, 400]);
          }
      }
      supportList.sort(function (a, b) { return a[0] < b[0] ? -1 : 1; });
      let absZ = abutPoints[1].z;
      let upt0 = [];
      let lpt0 = [];
      let upt1 = [];
      let lpt1 = [];
      for (let i = 0; i < supportList.length; i++) {
          let z1 = supportList[i][1] - supportList[i][2] - supportList[i][3] - absZ;
          let z2 = tempInput.ELsub + tempInput.footHeight - absZ;
          let x0 = 0;
          let x1 = 0;
          if (i === 0){
              x0 = abutPoints[0].offset;
              x1 = (supportList[i][0] + supportList[i + 1][0]) / 2; 
          }else if (i === supportList.length -1){
              x0 = (supportList[i-1][0] + supportList[i][0]) / 2;
              x1 = abutPoints[2].offset;
          } else {
              x0 = (supportList[i-1][0] + supportList[i][0]) / 2;
              x1 = (supportList[i][0] + supportList[i + 1][0]) / 2; 
          }
          let nCp0 = ToGlobalPoint(abutPoints[1], { x: x0, y: 0 }); 
          let nCp1 = ToGlobalPoint(abutPoints[1], { x: x1, y: 0 });
          upt0.push(ToGlobalPoint3(nCp0, { x: 0, y: z1 }));
          upt0.push(ToGlobalPoint3(nCp1, { x: 0, y: z1 }));
          upt1.push(ToGlobalPoint3(nCp0, { x: tempInput.supportDepth, y: z1 }));
          upt1.push(ToGlobalPoint3(nCp1, { x: tempInput.supportDepth, y: z1 }));
          lpt0.push(ToGlobalPoint3(nCp0, { x: 0, y: z2 }));
          lpt0.push(ToGlobalPoint3(nCp1, { x: 0, y: z2 }));
          lpt1.push(ToGlobalPoint3(nCp0, { x: tempInput.supportDepth, y: z2 }));
          lpt1.push(ToGlobalPoint3(nCp1, { x: tempInput.supportDepth, y: z2 }));
      }
      let ptGroup = [];
      let ptNum = supportList.length * 2;
      for (let i = 0; i<ptNum; i+=2){
          ptGroup.push([i, i+1, ptNum -(i + 2), ptNum -( i+1 )]);
      }
      model["wall"] = { "points": [[...upt0, ...lpt0.reverse()],[...upt1, ...lpt1.reverse()]],"ptGroup" : ptGroup };

      let points = [];
      model["Start"] = { "points": [], "ptGroup": [] };
      for (let index in abutPoints) {
          model["Start"]["points"].push([]);
          let totalH = abutPoints[index].z - tempInput.ELsub;
          points.push([{ x: 0, y: 0 },//시점을 기준으로 시계반대방향 순
          { x: -tempInput.backWallThick + tempInput.approachDepth, y: 0 },
          { x: -tempInput.backWallThick + tempInput.approachDepth, y: -tempInput.approachHeight },
          { x: -tempInput.backWallThick, y: -tempInput.approachHeight },
          { x: -tempInput.backWallThick, y: -tempInput.backWallHeight },
          { x: -tempInput.backWallThick + tempInput.backHaunchThick, y: -tempInput.backWallHeight - tempInput.backHaunchHeight },
          { x: -tempInput.backWallThick + tempInput.backHaunchThick, y: -totalH + tempInput.footHeight },
          { x: -tempInput.backWallThick + tempInput.backHaunchThick - tempInput.footLengthB, y: -totalH + tempInput.footHeight },
          { x: -tempInput.backWallThick + tempInput.backHaunchThick - tempInput.footLengthB, y: -totalH },
          { x: tempInput.supportDepth + tempInput.footLengthf, y: -totalH },
          { x: tempInput.supportDepth + tempInput.footLengthf, y: -totalH + tempInput.footHeight },
          // { x: tempInput.supportDepth, y: -totalH + tempInput.footHeight },
          // { x: tempInput.supportDepth, y: -totalH + tempInput.backHaunchHeight + abutHeight },
          { x: 0, y: -totalH + tempInput.footHeight }, //+ tempInput.backHaunchHeight + abutHeight },
          ]);
          points[index].forEach(npt => model["Start"]["points"][index].push(ToGlobalPoint3(abutPoints[index], npt)));
      }
      model["Start"]["ptGroup"] = [[0, 1, 2, 5, 6, 11], [2, 3, 4, 5], [7, 8, 9, 10]]; 
      //우선 직각인 날개벽을 예시로함
      for (let index of [0, 2]) {
          let nameKey = index === 0 ? "left" : "right";
          let sign = index === 0 ? 1 : -1;
          let pt1 = {};

          let pt2 = {};
          // let npt = [];
          let wingPoints = [
              { x: points[index][0].x - tempInput.wingLength, y: points[index][0].y - tempInput.wingLength * tempInput.wingGradient },
              { x: points[index][0].x - tempInput.wingLength, y: points[index][0].y - tempInput.wingLength * tempInput.wingGradient - tempInput.wingH1 },
              { x: points[index][7].x, y: points[index][0].y - tempInput.wingLength * tempInput.wingGradient - tempInput.wingH1 - tempInput.wingH2 },
              points[index][7], points[index][6], points[index][5], points[index][4], points[index][3], points[index][2], points[index][1]];

          let wingPt1 = [];
          wingPoints.forEach(pt => wingPt1.push(ToGlobalPoint3(abutPoints[index], pt)));
          let cos = abutPoints[index].normalCos;
          let sin = abutPoints[index].normalSin;
          let dx = sign * tempInput.wingWallThick * cos;
          let dy = sign * tempInput.wingWallThick * sin;
          let dz = sign * tempInput.wingWallThick * abutPoints[index].gradientY;
          // console.log(wingPoints, wingPt1)
          let wingPt2 = [{ x: wingPt1[0].x + dx, y: wingPt1[0].y + dy, z: wingPt1[0].z + dz },
          { x: wingPt1[1].x + dx, y: wingPt1[1].y + dy, z: wingPt1[1].z },
          { x: wingPt1[2].x + dx, y: wingPt1[2].y + dy, z: wingPt1[2].z },
          { x: wingPt1[3].x + dx, y: wingPt1[3].y + dy, z: wingPt1[3].z },];
          for (let i of [6, 5, 4, 3, 2, 1]) {
              pt1 = model["Start"]["points"][index][i];
              pt2 = model["Start"]["points"][1][i];
              let l = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2 + (pt1.z - pt2.z) ** 2);
              let l2D = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2);
              wingPt2.push(DividingPoint(pt1, pt2, tempInput.wingWallThick * l / l2D));
          }
          model[nameKey + "Wing"] = { "points": [wingPt1, wingPt2], "ptGroup": [[0, 7, 8, 9], [0, 1, 2, 6, 7], [2, 3, 4, 5, 6]] };

          let theta = Math.atan2(points[index][4].y - points[index][5].y, points[index][4].x - points[index][5].x);
          // Math.tan(theta/2) * tempInput.wingHaunch // 추후 방향을 고려하여 일반화 필요함
          let HPt = [];
          dx = tempInput.wingHaunch * sin;
          dy = - tempInput.wingHaunch * cos;
          for (let i of [4, 5, 6, 7]) {
              dz = i === 5 || i === 6 ? - Math.tan(theta / 2 - Math.PI / 4) * tempInput.wingHaunch : 0;
              pt1 = wingPt1[i];
              pt2 = wingPt2[i];
              let l = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2 + (pt1.z - pt2.z) ** 2);
              let l2D = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2);
              let hpt1 = { x: wingPt2[i].x + dx, y: wingPt2[i].y + dy, z: wingPt2[i].z + dz };
              let hpt2 = DividingPoint(pt1, pt2, (tempInput.wingWallThick + tempInput.wingHaunch) * l / l2D);
              HPt.push([wingPt2[i], hpt1, hpt2]);
          }
          let HPt2 = [];
          for (let i of [8, 9]) {
              dz = i === 9 ? - tempInput.wingHaunch * tempInput.wingGradient : 0;
              pt1 = wingPt1[i];
              pt2 = wingPt2[i];
              let l = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2 + (pt1.z - pt2.z) ** 2);
              let l2D = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2);
              let hpt1 = { x: wingPt2[i].x + dx, y: wingPt2[i].y + dy, z: wingPt2[i].z + dz };
              let hpt2 = DividingPoint(pt1, pt2, (tempInput.wingWallThick + tempInput.wingHaunch) * l / l2D);
              HPt2.push([wingPt2[i], hpt1, hpt2]);
          }
          model[nameKey + "WingH1"] = { "points": HPt, };
          model[nameKey + "WingH2"] = { "points": HPt2, };
      }

      return model
  }

  function AbutPoint(){
      this.addInput("girderLayout","girderLayout");
      this.addInput("slabLayout","arr");
      this.addOutput("startAbutPoint","arr");
      this.addOutput("endAbutPoint","arr");
    }
    
    AbutPoint.prototype.onExecute = function() {
      const result = AbutPointGen(this.getInputData(0), this.getInputData(1));
      this.setOutputData(0, result.start);
      this.setOutputData(0, result.end);
    };

    function AbutModel(){
      this.addInput("abutPoint","arr");
      this.addInput("abutInput","abutInput");
      this.addInput("supportData","supportData");
      this.addOutput("model","model");
    }
    
    AbutModel.prototype.onExecute = function() {
      const result = AbutModelGen(this.getInputData(0), this.getInputData(1), this.getInputData(2));
      this.setOutputData(0, result);
    };

  // import { defaultValues } from "./defaultValues";

  global.LiteGraph.registerNodeType("nexivil/MasterLine", MasterLine);
  global.LiteGraph.registerNodeType("nexivil/GirderLayout", GirderLayout);
  global.LiteGraph.registerNodeType("nexivil/gridPoint", GridPoint);
  global.LiteGraph.registerNodeType("nexivil/GridStationList", StationList);
  global.LiteGraph.registerNodeType("nexivil/SectionPoint", SectionPoint);
  global.LiteGraph.registerNodeType("nexivil/DeckPoint", DeckPoint);
  global.LiteGraph.registerNodeType("nexivil/MaterialQntt", MaterialQntt);

  global.LiteGraph.registerNodeType("HMECS/steelBox", SteelBox);
  global.LiteGraph.registerNodeType("HMECS/vStiffDict", VstiffDict);
  global.LiteGraph.registerNodeType("HMECS/diaDict", DiaDict);
  global.LiteGraph.registerNodeType("HMECS/hBracing", HBracing);
  global.LiteGraph.registerNodeType("HMECS/JackupDict", JackupDict);
  global.LiteGraph.registerNodeType("HMECS/HstiffDict",HstiffDict);
  global.LiteGraph.registerNodeType("HMECS/xbeam", Xbeam);
  global.LiteGraph.registerNodeType("nexivil/support",Support);
  global.LiteGraph.registerNodeType("nexivil/sapJoint",SapJoint);
  global.LiteGraph.registerNodeType("nexivil/sapFrame",SapFrame);
  global.LiteGraph.registerNodeType("nexivil/CompositeJoint",CompositeJoint);
  global.LiteGraph.registerNodeType("nexivil/CompositeFrame",CompositeFrame);
  global.LiteGraph.registerNodeType("nexivil/SectionDB",SectionDB);
  global.LiteGraph.registerNodeType("nexivil/AbutModel",AbutModel);
  global.LiteGraph.registerNodeType("nexivil/AbutPoint",AbutPoint);

  global.LiteGraph.registerNodeType("HMECS/splice", SplicePart);
  global.LiteGraph.registerNodeType("HMECS/barrier", BarrierPoint);
  global.LiteGraph.registerNodeType("HMECS/DeckRebar", DeckRebar);
  global.LiteGraph.registerNodeType("HMECS/Stud", Stud);


  global.LiteGraph.registerNodeType("3DVIEW/LineView",LineViewer);
  global.LiteGraph.registerNodeType("3DVIEW/steelPlateView", SteelPlateView);
  global.LiteGraph.registerNodeType("3DVIEW/diaPhragmView", DiaPhragmView);
  // LiteGraph.registerNodeType("3DVIEW/HorBracingView", HorBracingView);
  global.LiteGraph.registerNodeType("3DVIEW/initPoint", InitPoint);
  global.LiteGraph.registerNodeType("3DVIEW/deckView", DeckView);
  global.LiteGraph.registerNodeType("3DVIEW/BarrierView", BarrierView);
  global.LiteGraph.registerNodeType("3DVIEW/SpliceBoltView", SpliceBoltView);
  global.LiteGraph.registerNodeType("3DVIEW/RebarView", RebarView);
  global.LiteGraph.registerNodeType("3DVIEW/StudView", StudView);
  global.LiteGraph.registerNodeType("3DVIEW/AnalysisView", AnalysisView);
  global.LiteGraph.registerNodeType("3DVIEW/AnalysisResultView", AnalysisResultView);
  global.LiteGraph.registerNodeType("3DVIEW/LoftView", LoftView);

  global.LiteGraph.registerNodeType("Drawing/SectionView", SectionViewer );
  global.LiteGraph.registerNodeType("Drawing/TopView", TopViewer );
  // LiteGraph.registerNodeType("Drawing/SideView", SideViewer );
  global.LiteGraph.registerNodeType("Drawing/LineDraw", LineDraw );
  global.LiteGraph.registerNodeType("Drawing/LineSideDraw", LineSideDraw );
  global.LiteGraph.registerNodeType("Drawing/GirderLayoutDraw", GirderLayoutDraw );
  global.LiteGraph.registerNodeType("Drawing/GirderGeneralView1", GirderGeneralView1 );
  global.LiteGraph.registerNodeType("Drawing/GirderGeneralView2", GirderGeneralView2 );
  global.LiteGraph.registerNodeType("Drawing/PartGeneralView", PartGeneralView );
  global.LiteGraph.registerNodeType("Drawing/XbeamGeneralView", XbeamGeneralView );



  // const {
  //   horizon,
  //   vertical,
  //   superElevation,
  //   girderLayoutInput,
  //   SEShape,
  //   girderBaseInfo,
  //   xbeamLayout,
  //   xbeamSectionList,
  //   diaphragmLayout,
  //   diaphragmSectionList,
  //   vStiffLayout,
  //   vStiffSectionList,
  //   hBracingLayout,
  //   hBracingSectionList
  // } = defaultValues;

  // function HorizonInput(){
  //   this.addOutput("horizon","horizon")
  // }
  // HorizonInput.prototype.onExecute = function() {
  //   this.setOutputData(0,horizon)
  // }
  // LiteGraph.registerNodeType("nexivil/Horizon", HorizonInput);

}(global));
