var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var caseSchema = new Schema({
  name: String,
  type: String,
  facts: String,
  opposition: String,
  oppositionlawyer : String,
  respondantname : String,
  respondantdesignation : String,
  respondantmail: String,
  synopsis: String,
  caseno : String,
  lawyer: {
    lname: String,
    gender: String,
    exp: String,
    qualification: String,
    mobile: Number,
    email: String,
    uid: String,
    casesWon: Number,
    caseslost: Number,
    skills: String,
    street: String,
    district: String,
    state: String,
    image: String,
    pincode: String,
  },
  isClosed: Boolean,
  createdAt: { type: Date, default: Date.now },
  status: String,
  court: {
    cname: String,
    cdistrict: String,
    cstate: String,
    ccategory: String,
    cpincode: String,
  },
  judge: String,
  documents: [],
  department: String,
  admin: String,
});

module.exports = mongoose.model("Case", caseSchema);
