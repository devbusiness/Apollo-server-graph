import User from "./user";
import Reset from "./resetPassword";
import Product from "./product";
import Interface from "./utilSchema/interface";
import typeDef from "./utilSchema/extends";
import scalarTypes from "./utilSchema/scalarTypes";
import Invoice from "./invoice";

export default [User, Reset, Invoice, Product, typeDef, Interface, scalarTypes];
