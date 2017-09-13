import style from "./style.scss";

class Blubb {
    say(action) {
        action("Blubb");
    }
}

new Blubb().say(word => document.write("Say " + word));