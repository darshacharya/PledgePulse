#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// WiFi credentials - Replace with your WiFi details
const char* ssid = "GES WIFI 3";
const char* password = "Tiger$L1on";

// Your Next.js API endpoint - Replace with your computer's IP address
const char* serverUrl = "http://192.168.1.101:3000/api/take-oath";  

const int buttonPin = D2;  // Push button connected to D2
unsigned long buttonPressStartTime = 0;
const unsigned long HOLD_DURATION = 1000;  // 2.5 seconds in milliseconds
bool oathTaken = false;

void setup() {
  Serial.begin(115200);
  pinMode(buttonPin, INPUT_PULLUP);  // Enable internal pull-up resistor
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nConnected to WiFi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  
  int buttonState = digitalRead(buttonPin);
  
  // Button is pressed (LOW because of pull-up resistor)
  if (buttonState == LOW) {
    // Start timing if button was just pressed
    if (buttonPressStartTime == 0) {
      buttonPressStartTime = millis();
    }
    
    // Check if button has been held for 5 seconds and oath hasn't been taken yet
    if (!oathTaken && (millis() - buttonPressStartTime >= HOLD_DURATION)) {
      sendOath();
      oathTaken = true;  // Prevent multiple triggers until button is released
    }
  } else {
    // Button is released, reset variables
    buttonPressStartTime = 0;
    oathTaken = false;
  }
}

void sendOath() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    
    Serial.println("Sending oath...");
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    int httpResponseCode = http.POST("{}");
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Oath taken successfully!");
      Serial.println("Response: " + response);
    } else {
      Serial.println("Error sending oath");
      Serial.println("Error code: " + String(httpResponseCode));
    }
    
    http.end();
  }
  ensureWiFiConnection();
}


// WiFi reconnection logic
void ensureWiFiConnection() {
if (WiFi.status() != WL_CONNECTED) {
   Serial.println("Reconnecting to WiFi...");
   WiFi.reconnect();
   int attempts = 0;
   while (WiFi.status() != WL_CONNECTED && attempts < 20) {
     delay(500);
     Serial.print(".");
     attempts++;
   }
}
}