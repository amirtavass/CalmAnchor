# Screen Map

![Screen Map](./images/screen-map.png)

This diagram shows the navigation flow of CalmAnchor Lite and how the main screens are connected. The Day Schedule acts as the starting point for managing the doctor's daily appointments, while patient information and appointment changes can be accessed through related screens.

### Navigation Structure

**1. Day Schedule (Home)**

* The main screen where the doctor views the appointments scheduled for the day.
* → *Opens:* **Patient Detail**

  * → *Opens:* **Change Appointment Form**

    * → *After saving changes:* Returns to the updated **Day Schedule**

**2. Patient List**

* Displays all patients managed by the doctor.
* → *Opens:* **Patient Detail** where the doctor can view patient information and history.

**3. Doctor Profile / Settings**

* Displays basic doctor information and application preferences.
* This screen provides a dedicated place for future settings while keeping the current implementation focused on the required assessment scope.
