//
//  main.cpp
//  cOrbit
//
//  Created by Colin Gaudion on 10/05/2013.
//  Copyright (c) 2013 Colin Gaudion. All rights reserved.
//
//PROGRAM Orbit

//Computes the orbit of a small mass about a much larger mass, or it can be considered as computing the motion
//of the reduced mass about the center of mass.

#include <iostream>
#include <math.h>


const double G = 6.673E-08;             //Gravitational Constant (cgs)
const double AU = 1.4959787066E+13;     //Astronomical Unit (cm)
const double Msun = 1.9891E+33;         //Solar Mass (g)
const double spyr = 3.15581450E+07;     //Sidereal Year (s)
const double pi = 3.141592653589793;

int main(int argc, const char * argv[])
{

    //Open the output file
    ofstream fout;
    fout.open("orbit.txt", ios::out);
    
    //Get input from user
    double Mstrsun, aAU, e;
    cout << "Enter the mass of the parent star (in solar masses):  ";
    cin >> Mstrsun;
    
    cout << "\nEnter the semimajor axis of the orbit (in AU):  ";
    cin >> aAU;
    
    cout << "\nEnter the orbital eccentricity:  ";
    cin >> e;
    
    //Convert entered values to cgs units
    double Mstar = Mstrsun*Msun;
    double a = aAU*AU;
    
    //Calculate the orbital period in seconds using Kepler's Third Law (Eq. 2.39)
    double P = sqrt(4*pi*pi*a*a*a/(G*Mstar));
    
    //Convert the orbital period to years and print the result
    cout.setf(ios::fixed);
    cout.setf(ios::showpoint);
    cout.precision(3);
    cout << "The period of this orbit is " << setw(10) << P/spyr << " y" << endl;
    
    //Enter the number of time steps and the time interval to be printed
    int n, kmax;
    cout << "\n\nPlease enter the number of time steps to be calculated and the \n"
    << "    frequency with which you want time steps printed.\n"
    << "Note that taking too large a time step during the calculation\n"
    << "    will produce inaccurate results." << endl;
    cout << "\n\nEnter the number of time steps desired for the calculation:  ";
    cin >> n;
    
    cout << "\n\nHow often do you want time steps to be printed?\n"
    << "             1 = every time step\n"
    << "             2 = every second time step\n"
    << "             3 = every third time step\n"
    << "                         etc.\n\n"
    << "Frequency:  ";
    cin >> kmax;
    
    //Print header information for output file
    fout.setf(ios::fixed);
    fout.setf(ios::showpoint);
    fout.precision(3);
    fout << "                          Elliptical Orbit Data\n\n"
    << "                          Mstar = " << setw(10) << Mstrsun << " Mo\n"
    << "                          a     = " << setw(10) << aAU << " AU\n"
    << "                          P     = " << setw(10) << P/spyr << " y\n"
    << "                          e     = " << setw(10) << e << "\n\n\n"
    << "        t (yr)            r (AU)            x (AU)            y (AU)\n"
    << "        ------            ------            ------            ------" << endl;
    
    //Initialize print counter, angle, elapsed time, and time step.
    int k = 0;
    double theta = 0.0;         //angle from direction to perihelion (deg)
    double t = 0.0;             //elapsed time (s)
    double dt = P/double(n-1);  //time step (s)
    
    double r, x, y, LoM, dtheta;
    //Start main time step loop
    do {
        k++;
        
        //Calculate the distance from the principle focus using Eq. (2.3); Kepler's First Law.
        r = a*(1.0 - e*e)/(1.0 + e*cos(theta));
        
        //If time to print, convert to cartesian coordinates.  Be sure to print last point also.
        if (k == 1 || t >= P) {
            x = r*cos(theta)/AU;
            y = r*sin(theta)/AU;
            fout << "    " << setw(10) << t/spyr
            << "        " << setw(10) << r/AU
            << "        " << setw(10) << x
            << "        " << setw(10) << y << endl;}
        
        //Prepare for the next time step:  Update the elapsed time.
        t += dt;
        
        //Calculate the angular momentum per unit mass, L/m (Eq. 2.31).
        LoM = sqrt(G*Mstar*a*(1.0 - e*e));
        
        //Compute the next value for theta using the fixed time step by combining
        //Eqs. (2.32) and (2.34); Kepler's Second Law.
        dtheta = LoM/(r*r)*dt;
        theta += dtheta;
        
        //Reset the print counter if necessary.
        if (k == kmax) k = 0;
    } while (t < P + dt);
    cout << "The calculation is finished and the data are in ORBIT.TXT" << endl;
}








