// Time.js

/**
 * @fileOverview a file to define ROSLIB.Time class.
 *  these are should be merged into roslibjs.
 * @author Ryohei Ueda
 */

/**
 * Represents a time whith seconds and nanoseconds
 * @class Time
 * @param spec - a dictionary which include nsecs and secs as the keys.
 * @property secs {Integer} seconds
 * @property nsecscs {Integer} nanoseconds (10^-9)
 */
ROSLIB.Time = function(spec) {
  this.nsecs = Math.floor((spec || {}).nsecs || 0);
  this.secs = Math.floor((spec || {}).secs || 0);
};

/**
 * return the current time as Time instance
 */
ROSLIB.Time.now = function() {
  var now = new Date();
  var msec = now.getTime();
  return new ROSLIB.Time({
    secs: Math.floor(msec / 1000),
    nsecs: (msec % 1000) * 1000000
  });
};

/**
 * converts Time instance to floating point value in seconds
 */
ROSLIB.Time.prototype.toSec = function() {
  return this.secs + this.nsecs / 1000000000.0;
};

/**
 * converts Time instance to floating point value in millseconds
 */
ROSLIB.Time.prototype.toMillSec = function() {
  return this.secs * 1000 + this.nsecs / 1000000.0;
};

/**
 * adding two Time instance and return the result as Time instance
 * @param another - instance of Time
 */
ROSLIB.Time.prototype.add = function(another) {
  var sec_added = this.secs + another.secs;
  var nsec_added = this.nsecs + another.nsecs;
  if (nsec_added > 1000000000) {
    sec_added = sec_added + 1;
    nsec_added = nsec_added - 1000000000;
  }
  return new ROSLIB.Time({
    secs: sec_added,
    nsecs: nsec_added
  });
};

/**
 * substracting two Time instance and return the result as Time instance
 * @param another - instance of Time
 */
ROSLIB.Time.prototype.substract = function(another) {
  var sec_diff = this.secs - another.secs;
  var nsec_diff = this.nsecs - another.nsecs;
  if (nsec_diff < 0) {
    sec_diff = sec_diff - 1;
    nsec_diff = 1000000000 + nsec_diff;
  }
  return new ROSLIB.Time({
    secs: sec_diff,
    nsecs: nsec_diff
  });
};

/**
 * Returns true if two ROSLIB.Time instants point to the same time.
 * @param another - instance of Time
 */
ROSLIB.Time.prototype.equal = function(another) {
  var diff = this.substract(another);
  return ((diff.secs === 0) && (diff.nsecs === 0));
};

/**
 * Converts a JSON-ized message of stamp into ROSLIB.Time
 * @param msg - a message of stamp.
 */
ROSLIB.Time.fromROSMsg = function(msg) {
  return new ROSLIB.Time({secs: msg.secs, nsecs: msg.nsecs});
};

/**
 * Converts a second to an instance of ROSLIB.Time
 * @param sec - second
 */
ROSLIB.Time.fromSec = function(sec) {
  var lower_sec = sec - Math.floor(sec);
  return new ROSLIB.Time({secs: Math.floor(sec), nsecs: lower_sec * 1000000000});
};

/**
 * Converts ROSLIB.Time into Date object
 */
ROSLIB.Time.prototype.toDate = function() {
  var d = new Date();
  d.setTime(this.secs * 1000 + this.nsecs / 1000000);
  return d;
};
