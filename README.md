# KickNHit - Sports Equipment E-commerce

A full-stack e-commerce web application for sports (cricket n football) equipment built with Node.js, Express, MongoDB, and EJS.

## 🚀 Quick Setup  

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/anushi13prsnl/KickNHit.git
   cd KickNHit_Sports_ECommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the values in `.env`:
     ```
     NODE_ENV=development
     PORT=3000
     MONGODB_URI=your-mongodb-atlas-connection-string
     SESSION_SECRET=your-custom-secret-key (32+ characters, safe to change)
     ```
      > Note: The SESSION_SECRET is used to encrypt user sessions. 
      > You can safely change it to any unique string without breaking the app.


4. **Setup MongoDB Atlas**
   - Create a MongoDB Atlas cluster
   - Add sample data to collections `admins`, `products` and `users`
   - Follow below steps[5] to have some demo data populated in your project before hand

5. **Initialize Database with Demo Data**
   ```bash
   # Add demo admin and user accounts
   node insertDemoData.js
   
   # Add sample products (cricket & football equipment)
   node addDemoProducts.js
   ```

6. **Run the application**
   ```bash
   npm start
   ```

7. **Access the application**
   - Landing Page: http://localhost:3001
   - User Dashboard: Login required
   - Admin Dashboard: Login required

## 🔑 Demo Credentials  

Admin Login
- Email: `admin1@kicknhit.com`
- Password: `password`
- Access: Full admin dashboard with product management

User Login  
- Email: `john@example.com`
- Password: `password`
- Access: User dashboard with shopping features

Or can pick any other login credential from insertDemoData.js & addDemoProducts.js, if using my demo data (following Step[5] of installation steps)

##  Features

Landing Page
- Hero section with product showcase
- About section with company story
- Contact information

Admin Dashboard
- Product management (Add/Delete)

User Dashboard
- Product browsing and search
- Shopping cart functionality

On my way to add more features, till now have these only :)
## 📁 Project Structure
```
├── controllers/     # Business logic controllers
│   └── admin/       # Admin-specific controllers
│       ├── adminController.js
│       └── productController.js
├── models/          # Database models (Admin, User, Product)
│   ├── Admin.js
│   ├── Product.js
│   └── User.js
├── routes/          # Route handlers
│   ├── apiRoutes.js
│   └── authRoutes.js
├── views/           # EJS templates
│   ├── admin-dashboard.ejs
│   ├── admin-login.ejs
│   ├── landing.ejs
│   ├── user-dashboard.ejs
│   ├── user-login.ejs
│   └── user-signup.ejs
├── app.js           # Main application file
├── insertDemoData.js    # Demo accounts setup
├── addDemoProducts.js   # Demo products setup
├── package.json     # Dependencies
├── README.md        # Project documentation
├── Extras          # Demo Video
├── License
└── .env            # Environment variables (create this)
```

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Frontend:** EJS, Tailwind CSS
- **Authentication:** bcrypt, express-session
- **Styling:** Tailwind CSS with responsive design

## Quick Start Guide
1. Run `npm install`
2. Create `.env` with your MongoDB URI
3. Run `node insertDemoData.js` and `node addDemoProducts.js`
4. Start with `npm start`
5. Visit http://localhost:3001 to see the landing page
6. Use demo credentials to access admin/user 
7. 'Add/Del products' being admin and 'Add to Cart' products being user

---

## Developer

<h3>Made with ❤️ by Anushi</h3>

I'm passionate about creating full-stack web applications that solve real-world problems. This e-commerce platform showcases modern web development practices using the MERN stack with EJS templating.

### Connect with Me 🤝 

- **GitHub:** [@anushi13prsnl](https://github.com/anushi13prsnl)
- **LinkedIn:** [@anushirajput](https://linkedin.com/in/anushirajput)
- **Email:** anushi4849@gmail.com


Feel free to reach out for collaborations, questions, or just to connect! 

---

## 📄 License

**ISC License** - Use freely, just keep my name in it! 😊

See [LICENSE](LICENSE) for details.

---

<h3>If you found this project helpful, please give it a star ⭐</h3>