Notice:  This is the front-end framework of this wechat mini-program. As it relies on the basic framework of the cloud development platform that comes with the wechat mini-program development platform, some unnecessary parts have not been changed.


This mini-program development is based on wechat developer tools and a cloud development environment.

Basic framework

Based on the native framework of wechat Mini Programs, the interface and interaction are constructed using WXML (page structure), WXSS (style), and JavaScript (logic processing).

2. Database Type:

Wechat Cloud development provides a document-based database based on MongoDB by default, which is suitable for storing flexible contact data (such as name, student number, phone number, class, avatar URL, etc.), and supports nested documents and arrays, facilitating the expansion of information dimensions.

3. Data operation mode:

The front end directly calls the cloud database API (wx.cloud.database().collection()) to achieve addition, deletion, modification and query, without the need to set up additional back-end services, thus simplifying the development process.

4. Permission Control: Relying on the permission configuration of the cloud database (such as "Only the creator can read and write" and "All users can read"), ensure the security of the contact list data - for example, students can only view public information, while administrators can edit all data.
