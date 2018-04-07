/*
 * discharge.java    Plots emission line spectra of elements from tables
 *                  of emission line wavelength and line strength
 * INPUT :  filename of element emission line wavelengths/strengths table
 *          and various other applet parameters (see below)
 * OUTPUT:  Color encoded spectra simulating a gas discharge plasma
 *
 *  by John Talbot Friday June 13, 1997
 *
 *
 *           J.Koeppen           Kiel/Strasbourg           june 2007
 */

import java.applet.*;
import java.awt.*;
import java.io.*;
import java.net.*;

public class discharge extends Applet implements Runnable {

  private Thread  kicker;
  private boolean running = false;

  int    spectraWidth, spectraHeight, count, mode = 0, iversion = 0;
  Color  spectra[] = new Color[1280];
  double wavelength[] = new double[200];
  double strength[]   = new double[200];
    // chosen points in the color array spectra
    double colors[][] = {{ 4000.0,      150,   0, 150},  
                         { 4400.0,      120,   0, 255},  // violet
                         { 4500.0,        0,   0, 255},  // blue
                         { 4800.0,        0, 255, 255},  // cyan
                         { 5200.0,        0, 255,   0},  // green
                         { 5800.0,      255, 255,   0},  // yellow
                         { 6500.0,      255,   0,   0},  // red
                         { 7000.0,       80,   0,   0},
                         { 7300.0,        0,   0,   0} };
  double startWavelength, endWavelength, lineWidth, contrast, continuum,
         dwave;

  TextField startWaveField = new TextField(),
            endWaveField = new TextField(),
            contrastField = new TextField(),
            lineWidthField = new TextField(),
            continuumField = new TextField();
  Label resultLabel = new Label("---");
  Button showButton = new Button("show");
  Canvas screen = new spectrumCanvas(this);

  String element = "hydrogen.txt";
  int ielement = 2;
  Choice elementChoice = new Choice();
  int icolor = 0;
  Choice colorChoice = new Choice();

  public void init() {
//
//   read parameters from html page
//
    iversion = (int)ourParameter("version", 0);
    icolor   = (int)ourParameter("eye", 0);
    String element = getParameter("element");
    if(element == null) {
      element="hydrogen.txt";
    } else if(element == "solar.txt")  {
      mode = 1;
    }
    startWavelength  = ourParameter("startWavelength",3950);
    endWavelength    = ourParameter("endWavelength",7050);
    lineWidth        = ourParameter("lineWidth",1);
    contrast         = ourParameter("contrast",1.0);
    continuum        = ourParameter("continuum",0.3);

    chooseColours(icolor);
    readLineDataFile(element);
    computeSpectrum();

    Label minWL = new Label("min.wavelength [A]");
    Label maxWL = new Label("max.wavelength [A]");
    Label empty = new Label("       ");
    Label lineWL = new Label("line width [A]");
    Label contrastL = new Label("contrast");
    Label continuumL = new Label("continuum");

    boolean isBlack = true;
    if(isBlack) {
      resultLabel.setBackground(Color.black);
      resultLabel.setForeground(Color.white);
      showButton.setBackground(Color.black);
      showButton.setForeground(Color.white);
      minWL.setBackground(Color.black);
      minWL.setForeground(Color.white);
      startWaveField.setBackground(Color.black);
      startWaveField.setForeground(Color.white);
      maxWL.setBackground(Color.black);
      maxWL.setForeground(Color.white);
      endWaveField.setBackground(Color.black);
      endWaveField.setForeground(Color.white);
      lineWL.setBackground(Color.black);
      lineWL.setForeground(Color.white);
      lineWidthField.setBackground(Color.black);
      lineWidthField.setForeground(Color.white);
      contrastL.setBackground(Color.black);
      contrastL.setForeground(Color.white);
      contrastField.setBackground(Color.black);
      contrastField.setForeground(Color.white);
      continuumL.setBackground(Color.black);
      continuumL.setForeground(Color.white);
      continuumField.setBackground(Color.black);
      continuumField.setForeground(Color.white);
      elementChoice.setBackground(Color.black);
      elementChoice.setForeground(Color.white);
      colorChoice.setBackground(Color.black);
      colorChoice.setForeground(Color.white);
      empty.setBackground(Color.black);
      empty.setForeground(Color.white);
    }

    Panel controlPanel = new Panel();
    controlPanel.setLayout(new GridLayout(3,2));

    Panel p1 = new Panel();
    p1.setLayout(new GridLayout(1,2));
    p1.add(minWL);
    startWaveField.setText( String.valueOf(startWavelength) );
    p1.add(startWaveField);
    controlPanel.add(p1);

    Panel p2 = new Panel();
    p2.setLayout(new GridLayout(1,2));
    p2.add(maxWL);
    endWaveField.setText( String.valueOf(endWavelength) );
    p2.add(endWaveField);
    controlPanel.add(p2);

    Panel p3 = new Panel();
    p3.setLayout(new GridLayout(1,2));
    p3.add(lineWL);
    lineWidthField.setText( String.valueOf(lineWidth) );
    p3.add(lineWidthField);
    controlPanel.add(p3);

    Panel p4 = new Panel();
    p4.setLayout(new GridLayout(1,2));
    p4.add(contrastL);
    contrastField.setText( String.valueOf(contrast) );
    p4.add(contrastField);
    controlPanel.add(p4);

    Panel p5 = new Panel();
    p5.setLayout(new GridLayout(1,2));
    p5.add(continuumL);
    continuumField.setText( String.valueOf(continuum) );
    p5.add(continuumField);
    controlPanel.add(p5);

    Panel p6 = new Panel();
    p6.setLayout(new GridLayout(1,2));
    p6.add(resultLabel);
    p6.add(showButton);
    controlPanel.add(p6);

    elementChoice.addItem("Rainbow colours");
    elementChoice.addItem("Solar Spectrum");
    elementChoice.addItem("Hydrogen");
    elementChoice.addItem("Helium");
    elementChoice.addItem("Helium I");
    elementChoice.addItem("Helium II");
    elementChoice.addItem("Carbon");
    elementChoice.addItem("Nitrogen");
    elementChoice.addItem("Oxygen");
    elementChoice.addItem("Neon");
    elementChoice.addItem("Sodium");
    elementChoice.addItem("Magnesium");
    elementChoice.addItem("Aluminium");
    elementChoice.addItem("Silicon");
    elementChoice.addItem("Sulphur");
    elementChoice.addItem("Argon");
    elementChoice.addItem("Potassium");
    elementChoice.addItem("Calcium");
    elementChoice.addItem("Calcium I");
    elementChoice.addItem("Calcium II");
    elementChoice.addItem("Calcium III");
    elementChoice.addItem("Iron");
    elementChoice.addItem("Krypton");
    elementChoice.addItem("Strontium");
    elementChoice.addItem("Strontium I");
    elementChoice.addItem("Xenon");
    elementChoice.addItem("Barium");
    elementChoice.addItem("Barium I");
    elementChoice.addItem("Mercury");
    elementChoice.select(ielement);

    colorChoice.addItem("young person's eyes");
    colorChoice.addItem("my own eyes");
    colorChoice.addItem("Jon's eyes (green-yellow blindness)");
    colorChoice.addItem("just Black & White");
    colorChoice.select(icolor);

    Panel southPanel = new Panel();
    southPanel.setLayout(new GridLayout(1,3));
    southPanel.add(elementChoice);
    southPanel.add(empty);
    southPanel.add(colorChoice);

    setLayout(new BorderLayout());
    if(iversion == 1)  add("South", controlPanel);
    add("Center", screen);
    if(iversion == 1)  add("North", southPanel);
  }

  public void start()  {
      kicker  = new Thread(this);
      kicker.start();
      running = true;
  }
  public void stop()   {
    if(kicker!=null)   {
      kicker.stop();
      kicker = null;
    }
    running = false;
  }
  public void run()   {
    computeSpectrum();
    screen.repaint();
    while(running)  {
      try {
        Thread.sleep(0,5);
      }
      catch (InterruptedException e) {};
    }
  }


  public boolean action(Event e, Object arg)  {
    if(e.target == showButton)  {
      startWavelength = Double.valueOf(startWaveField.getText()).doubleValue();
      endWavelength = Double.valueOf(endWaveField.getText()).doubleValue();
      lineWidth = Double.valueOf(lineWidthField.getText()).doubleValue();
      contrast = Double.valueOf(contrastField.getText()).doubleValue();
      continuum = Double.valueOf(continuumField.getText()).doubleValue();
      computeSpectrum();
      screen.repaint();
      return true;
    }
    if(e.target instanceof TextField)  {
      startWavelength = Double.valueOf(startWaveField.getText()).doubleValue();
      endWavelength = Double.valueOf(endWaveField.getText()).doubleValue();
      lineWidth = Double.valueOf(lineWidthField.getText()).doubleValue();
      contrast = Double.valueOf(contrastField.getText()).doubleValue();
      continuum = Double.valueOf(continuumField.getText()).doubleValue();
      element = manageElement(ielement);
      computeSpectrum();
      screen.repaint();
      return true;
    }
    if(e.target == elementChoice)  {
      startWavelength = Double.valueOf(startWaveField.getText()).doubleValue();
      endWavelength = Double.valueOf(endWaveField.getText()).doubleValue();
      ielement = elementChoice.getSelectedIndex();
      element = manageElement(ielement);
      readLineDataFile(element);
      computeSpectrum();
      screen.repaint();
      return true;
    }
    if(e.target == colorChoice)  {
      startWavelength = Double.valueOf(startWaveField.getText()).doubleValue();
      endWavelength = Double.valueOf(endWaveField.getText()).doubleValue();
      icolor = colorChoice.getSelectedIndex();
      chooseColours(icolor);
      computeSpectrum();
      screen.repaint();
      return true;
    }
    return true;
  }

  public boolean mouseEnter(Event e, int ix, int iy) {
//
    Object et = e.target;
    if(et instanceof Canvas) {
      Object frame = getParent();
      while(!(frame instanceof Frame))
      frame = ((Component)frame).getParent();
        ((Frame)frame).setCursor(Frame.CROSSHAIR_CURSOR);
    }
    return true;
  }

  public boolean mouseExit(Event e, int ix, int iy) {
//
    Object et = e.target;
    if(et instanceof Canvas) {
      Object frame = getParent();
      while(!(frame instanceof Frame))
        frame = ((Component)frame).getParent();
      ((Frame)frame).setCursor(Frame.DEFAULT_CURSOR);
    }
    return true;
  }

  public boolean mouseDown(Event e, int ix, int iy) {
//
//    finish handling the mouse click
//
    Object et = e.target;
    if(et == screen) {
      double wave = startWavelength + dwave*ix;
      resultLabel.setText("Wavelength = "+String.valueOf(wave)+" A");
    }
    return true;
  }



  String manageElement(int i)  {
      if(ielement == 0)  {
        lineWidthField.disable();
        continuumField.disable();
        contrastField.disable();
        lineWidth = 2.5;
        contrast  = 0.0;
        continuum = 1.0;
        mode = 0;
      } else if(ielement == 1)  {
        lineWidthField.disable();
        continuumField.disable();
        contrastField.disable();
        lineWidth = 2.5;
        contrast  = 0.0004;
        continuum = 1.0;
        mode = 1;
      } else {
        lineWidthField.enable();
        continuumField.enable();
        contrastField.enable();
        lineWidth = Double.valueOf(lineWidthField.getText()).doubleValue();
        contrast = Double.valueOf(contrastField.getText()).doubleValue();
        continuum = Double.valueOf(continuumField.getText()).doubleValue();
        mode = 0;
      }
    switch (i) {
      case 0:   return "solar.txt";  
      case 1:   return "solar.txt";
      case 2:   return "hydrogen.txt";
      case 3:   return "helium.txt";
      case 4:   return "helium1.txt";
      case 5:   return "helium2.txt";
      case 6:   return "carbon.txt";
      case 7:   return "nitrogen.txt";
      case 8:   return "oxygen.txt";
      case 9:   return "neon.txt";
      case 10:   return "sodium.txt";
      case 11:   return "magnesium.txt";
      case 12:   return "aluminum.txt";
      case 13:   return "silicon.txt";
      case 14:   return "sulfur.txt";
      case 15:   return "argon.txt";
      case 16:   return "potassium.txt";
      case 17:   return "calcium.txt";
      case 18:   return "calcium1.txt";
      case 19:   return "calcium2.txt";
      case 20:   return "calcium3.txt";
      case 21:   return "iron.txt";
      case 22:   return "krypton.txt";
      case 23:   return "strontium.txt";
      case 24:   return "strontium1.txt";
      case 25:   return "xenon.txt";
      case 26:   return "barium.txt";
      case 27:   return "barium1.txt";
      case 28:   return "mercury.txt";
    }
    return "solar.txt";
  }

  void readLineDataFile(String element)  {    
    // Read element emission line file
    count = 0;
    try {
      URL lines=new URL(getCodeBase()+element);
      if(lines!=null) {
        InputStream elementStream=lines.openConnection().getInputStream();
        if(elementStream!=null) {
          StreamTokenizer tokens = new StreamTokenizer(elementStream);
          while(tokens.nextToken()!=tokens.TT_EOF) {
            wavelength[count]=tokens.nval;
            tokens.nextToken();
            strength[count]=tokens.nval;
            if(count++>199) break;
          }
        }
      }
    } catch(IOException e) {
      System.out.println(" URL not found");
    }
  }

  void computeSpectrum()  {
    Dimension    d = screen.size();  
    spectraWidth   = d.width;
    spectraHeight  = d.height;
    // compute spectra intensity array
    double intensity[] = new double[spectraWidth];
    dwave = (endWavelength-startWavelength)/spectraWidth;
    double lineWidth2 = lineWidth*lineWidth;
    double wave, sum, delta;
    double maxs = -1.0e23;
    for(int i=0; i<spectraWidth; i++) {
      wave = i*dwave + startWavelength;
      sum = 0.0;
      for(int j=0; j<count; j++) {
        delta = wavelength[j] - wave;
        sum   = sum + strength[j]*Math.exp(-delta*delta/lineWidth2);
      }
      intensity[i] = sum;
      if(sum > maxs) maxs = sum;
    }
    if(maxs == 0) maxs = 1;
    double scale=(1-continuum)*contrast/maxs;
    //
    // Interpolate color array to obtain spectra
    //
    int RED   = 1;
    int GREEN = 2;
    int BLUE  = 3;
    double dw,fraction;
    for(int i=0; i<spectraWidth; i++) {
      wave = i*dwave + startWavelength;
      dw = wave;
      dw = Math.max(dw, 4000.0);
      dw = Math.min(dw, 7000.0);
      int k = 0;
      while(dw > colors[++k][0]) {}
      fraction = (dw-colors[k-1][0])/(colors[k][0]-colors[k-1][0]);
      double wavRed   = fraction*(colors[k][RED]  -colors[k-1][RED])  +colors[k-1][RED];
      double wavGreen = fraction*(colors[k][GREEN]-colors[k-1][GREEN])+colors[k-1][GREEN];
      double wavBlue  = fraction*(colors[k][BLUE] -colors[k-1][BLUE]) +colors[k-1][BLUE];

      double plot = continuum + scale*intensity[i];
      //     absorption lines 
      if(mode == 1) plot = continuum*(1.0-Math.min(1.0,contrast*intensity[i]));
      if(plot > 1.0) plot = 1.0;
      spectra[i] = new Color((int)(plot*wavRed), (int)(plot*wavGreen), (int)(plot*wavBlue));
    }
  }

  private void chooseColours(int mcolor) {
    if(mcolor == 0)   {       
      // ideal young eyes
      colors[0][0] = 4000.0; colors[0][1] =  150; colors[0][2] =   0; colors[0][3] = 150;  
      colors[1][0] = 4400.0; colors[1][1] =  120; colors[1][2] =   0; colors[1][3] = 255;  
      colors[2][0] = 4500.0; colors[2][1] =    0; colors[2][2] =   0; colors[2][3] = 255;  
      colors[3][0] = 4800.0; colors[3][1] =    0; colors[3][2] = 255; colors[3][3] = 255;  
      colors[4][0] = 5200.0; colors[4][1] =    0; colors[4][2] = 255; colors[4][3] =   0;  
      colors[5][0] = 5800.0; colors[5][1] =  255; colors[5][2] = 255; colors[5][3] =   0;  
      colors[6][0] = 6500.0; colors[6][1] =  255; colors[6][2] =   0; colors[6][3] =   0;  
      colors[7][0] = 7000.0; colors[7][1] =   80; colors[7][2] =   0; colors[7][3] =   0;  
      colors[8][0] = 7200.0; colors[8][1] =    0; colors[8][2] =   0; colors[8][3] =   0;  
    } else if (mcolor == 1)  {
      // my own eyes
      colors[0][0] = 4000.0; colors[0][1] =    0; colors[0][2] =   0; colors[0][3] =   0;  
      colors[1][0] = 4450.0; colors[1][1] =  150; colors[1][2] =   0; colors[1][3] = 150;  
      colors[2][0] = 4550.0; colors[2][1] =  150; colors[2][2] =   0; colors[2][3] = 235;  
      colors[3][0] = 4800.0; colors[3][1] =    0; colors[3][2] = 255; colors[3][3] = 255;  
      colors[4][0] = 5200.0; colors[4][1] =    0; colors[4][2] = 255; colors[4][3] =   0;  
      colors[5][0] = 5800.0; colors[5][1] =  255; colors[5][2] = 255; colors[5][3] =   0;  
      colors[6][0] = 6500.0; colors[6][1] =  255; colors[6][2] =   0; colors[6][3] =   0;  
      colors[7][0] = 7000.0; colors[7][1] =   80; colors[7][2] =   0; colors[7][3] =   0;  
      colors[8][0] = 7200.0; colors[8][1] =    0; colors[8][2] =   0; colors[8][3] =   0;  
    } else if (mcolor == 2)  {
      // jonathan's eyes
      colors[0][0] = 4000.0; colors[0][1] =  150; colors[0][2] =   0; colors[0][3] = 150;  
      colors[1][0] = 4200.0; colors[1][1] =  120; colors[1][2] =   0; colors[1][3] = 255;  
      colors[2][0] = 4400.0; colors[2][1] =    0; colors[2][2] =   0; colors[2][3] = 255;  
      colors[3][0] = 4600.0; colors[3][1] =    0; colors[3][2] = 255; colors[3][3] = 200;  
      colors[4][0] = 4700.0; colors[4][1] =    0; colors[4][2] = 255; colors[4][3] =   0;  
      colors[5][0] = 4800.0; colors[5][1] =  200; colors[5][2] = 255; colors[5][3] =   0;  
      colors[6][0] = 5800.0; colors[6][1] =  255; colors[6][2] = 255; colors[6][3] =   0;  
      colors[7][0] = 6500.0; colors[7][1] =  255; colors[7][2] =   0; colors[7][3] =   0;  
      colors[8][0] = 7000.0; colors[8][1] =   80; colors[8][2] =   0; colors[8][3] =   0;  
    } else if (mcolor == 3)  {
      // black and white
      int jk = 255;
      colors[0][0] = 4000.0; colors[0][1] =  jk; colors[0][2] = jk; colors[0][3] = jk;  
      colors[1][0] = 4200.0; colors[1][1] =  jk; colors[1][2] = jk; colors[1][3] = jk;  
      colors[2][0] = 4400.0; colors[2][1] =  jk; colors[2][2] = jk; colors[2][3] = jk;  
      colors[3][0] = 4600.0; colors[3][1] =  jk; colors[3][2] = jk; colors[3][3] = jk;  
      colors[4][0] = 4700.0; colors[4][1] =  jk; colors[4][2] = jk; colors[4][3] = jk;  
      colors[5][0] = 4800.0; colors[5][1] =  jk; colors[5][2] = jk; colors[5][3] = jk;  
      colors[6][0] = 5800.0; colors[6][1] =  jk; colors[6][2] = jk; colors[6][3] = jk;  
      colors[7][0] = 6500.0; colors[7][1] =  jk; colors[7][2] = jk; colors[7][3] = jk;  
      colors[8][0] = 7000.0; colors[8][1] =  jk; colors[8][2] = jk; colors[8][3] = jk;  
    }
  }



  public double ourParameter(String label, double defaultValue) {
  //
  //     read in a paremeter from the html page
  //
    String valueString = getParameter(label);
    Double value;
    if(valueString != null)  {
      try {
        value = new Double(valueString);
      } catch (NumberFormatException e) {
        value = new Double(defaultValue);
      }
    } else {
      value = new Double(defaultValue);
    }
    return value.doubleValue();
  }

  public String[][] getParameterInfo() {
    String[][] info = {
      // Parameter Name     Kind of Value  Description
      {"element",         "String", "element filename"},
      {"startWavelength", "double", "starting wavelength in Angstroms (default 4000)"},
      {"endWavelength",   "double", "ending wavelength in Angstroms (default 7000)"},
      {"lineWidth",       "double", "emission line spectral width in Angstroms"},
      {"contrast",        "double", "contrast boost faint line if required (default 1)"},
      {"continuum",       "double", "blackbody background continuum (default 0 up to 1)"}
    };
    return info;
  }    
}


class spectrumCanvas extends Canvas{
  discharge d;

  public spectrumCanvas(discharge di) {
    d = di;
  }

  public void paint(Graphics g) {
    for(int i=0; i<d.spectraWidth; i++) {
      g.setColor(d.spectra[i]);
      g.drawLine(i,0,i,d.spectraHeight-1);
    }
    if(d.iversion == 2)   return;
    //
    //   wavelength scale: ticks and labels
    // 
    g.setColor(Color.white);
    int tickbot = d.spectraHeight;
    int ticktop = d.spectraHeight-20;
    int i=0, ix=0, iy=0;
    String text;
    FontMetrics fm = getFontMetrics(g.getFont());
    for(int iw=3500;iw<=7500;iw=iw+500) {
      i = (int)(((double)iw-d.startWavelength)/d.dwave+0.5);
      g.drawLine(i,tickbot,i,ticktop);
      text = String.valueOf(iw);
      ix = i - fm.stringWidth(text)/2;
      iy = d.spectraHeight - 30 - fm.getHeight()/2 + fm.getAscent();
      g.drawString(text,ix,iy);
    }
    ticktop = d.spectraHeight-10;
    for(int iw=3500;iw<7500;iw=iw+100) {
      i = (int)(((double)iw-d.startWavelength)/d.dwave+0.5);
      g.drawLine(i,tickbot,i,ticktop);
    }
    if(d.endWavelength-d.startWavelength < 500.0) {
//
//    make a finer scale when the wavelength interval
//    is rather small ... one could well improve this further
//
      ticktop = d.spectraHeight-8;
      for(int iw=3500;iw<7500;iw=iw+50) {
        i = (int)(((double)iw-d.startWavelength)/d.dwave+0.5);
        g.drawLine(i,tickbot,i,ticktop);
        text = String.valueOf(iw);
        ix = i - fm.stringWidth(text)/2;
        iy = d.spectraHeight - 30 - fm.getHeight()/2 + fm.getAscent();
        g.drawString(text,ix,iy);
      }
      ticktop = d.spectraHeight-5;
      for(int iw=3500;iw<7500;iw=iw+10) {
        i = (int)(((double)iw-d.startWavelength)/d.dwave+0.5);
        g.drawLine(i,tickbot,i,ticktop);
      }
    }
  }
}
