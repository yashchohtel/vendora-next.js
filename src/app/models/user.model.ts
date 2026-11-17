import mongoose from "mongoose";

// user model interface
export interface IUser {

    // mongodb generated unique identifier for the user
    _id?: mongoose.Types.ObjectId;

    // name
    name: string;

    // email
    email: string;

    // password
    password?: string;

    // profile image url
    image?: string;

    // url
    role: "user" | "vendor" | "admin";

    // phone number
    phone?: string;

    /* -------------------- VENDOR FIELDS -------------------- */

    // shop name
    shopName?: string;

    // business address
    businessAddress?: string;

    // gst number
    gstNumber?: string;

    // is the vendor approved by admin
    isApproved?: boolean;

    // verification status of the vendor
    verificationStatus?: "pending" | "approved" | "rejected";

    // timestamps for vendor verification
    requestedAt?: Date;

    // approved timestamp
    approvedAt?: Date;

    // rejected reason
    rejectedReason?: string;

    /* -------------------- PRODUCT & ORDER REFERENCES -------------------- */

    // Products created by vendor
    vendorProducts?: IProduct[];

    // Orders placed by user
    orders?: mongoose.Types.ObjectId[];

    /* -------------------- CART DATA -------------------- */

    cart?: {
        product: mongoose.Types.ObjectId;
        quantity: number;
    }[];

    /* -------------------- CHAT DATA -------------------- */

    // chats with other users
    chats?: {
        with: mongoose.Types.ObjectId; // kis user ke saath chat
        messages: {
            sender: mongoose.Types.ObjectId; // kisne message bheja
            text: string;
            createdAt: Date;
        }[];
    }[];

    // timestamps
    createdAt?: Date;
    updatedAt?: Date;

};

// user schema
const userSchema = new mongoose.Schema<IUser>({

    // name of the user (required field)
    name: { type: String, required: true },

    // email of the user (must be unique)
    email: { type: String, required: true, unique: true },

    // hashed password of the user
    password: { type: String },

    // profile image URL
    image: { type: String },

    // phone number of the user
    phone: { type: String },

    // role of the user (user, vendor or admin)
    role: {
        type: String,
        enum: ["user", "vendor", "admin"],
        default: "user",
    },

    /* ---------------- VENDOR INFO ---------------- */

    // name of the vendor's shop
    shopName: { type: String },

    // business address of the vendor
    businessAddress: { type: String },

    // GST number of the vendor
    gstNumber: { type: String },

    // whether the vendor is approved by admin
    isApproved: { type: Boolean, default: false },

    // vendor verification status (pending, approved or rejected)
    verificationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },

    // date when vendor verification was requested
    requestedAt: { type: Date },

    // date when vendor was approved
    approvedAt: { type: Date },

    // reason for vendor rejection
    rejectedReason: { type: String },

    /* ---------------- PRODUCT REFERENCES ---------------- */

    // products created by the vendor (references Product model)
    vendorProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],

    /* ---------------- ORDER REFERENCES ---------------- */

    // orders placed by the user (references Order model)
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],

    /* ---------------- CART ---------------- */

    // products added to the user's cart with their quantities
    cart: [
        {
            // reference to the Product model
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },

            // quantity of the product in the cart (default: 1)
            quantity: { type: Number, default: 1 },
        },
    ],

    /* ---------------- CHAT DATA ---------------- */

    // chats with other users
    chats: [
        {
            // user with whom the current user is chatting
            with: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            // messages inside the chat
            messages: [
                {
                    // user who sent the message
                    sender: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                    },

                    // message text
                    text: {
                        type: String,
                        required: true,
                    },

                    // date and time when the message was sent
                    createdAt: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
        },
    ],

}, { timestamps: true }); // automatically creates createdAt and updatedAt fields

// create and export the User model
const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
