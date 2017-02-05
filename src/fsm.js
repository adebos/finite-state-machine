class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {

        var message = {failure: 'Error: invalid initial config'};

        this.configInit = config;
        this.stateStudent = this.configInit.initial;
        this.undoState2 = null;
        this.undoState = null;
        this.redoState = null;
        this.redoState2 = null;
        this.arrStates = ['normal', 'busy', 'hungry', 'sleeping'];

        if (config == null) {
            throw new Error(message.failure);
        }

        /*const config = {
            initial: 'normal',
            states: {
                normal: {
                    transitions: {
                        study: 'busy',
                    }
                },
                busy: {
                    transitions: {
                        get_tired: 'sleeping',
                        get_hungry: 'hungry',
                    }
                },
                hungry: {
                    transitions: {
                        eat: 'normal'
                    },
                },
                sleeping: {
                    transitions: {
                        get_hungry: 'hungry',
                        get_up: 'normal',
                    },
                },
            }
        };*/
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.stateStudent;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        var message = {failure: 'Error: invalid state'};

        //if (this.configInit.state == undefined){
        if (state in this.configInit.states){
            this.undoState2 = this.undoState;
            this.undoState = this.stateStudent;
            this.stateStudent = state;
        } else {
            throw new Error(message.failure);
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var message = {failure: 'Error: invalid event'};

        if (this.stateStudent in this.configInit.states){

            switch (event) {
                case 'study':
                this.undoState2 = this.undoState;
                    this.undoState = this.stateStudent;
                    this.stateStudent = 'busy';
                break;
                case 'get_tired':
                this.undoState2 = this.undoState;
                    this.undoState = this.stateStudent;
                    this.stateStudent = 'sleeping';
                break;
                case 'get_hungry':
                this.undoState2 = this.undoState;
                    this.undoState = this.stateStudent;
                    this.stateStudent = 'hungry';
                break;
                case 'eat':
                this.undoState2 = this.undoState;
                    this.undoState = this.stateStudent;
                    this.stateStudent = 'normal';
                break;
                case 'get_up':
                this.undoState2 = this.undoState;
                    this.undoState = this.stateStudent;
                    this.stateStudent = 'normal';
                break;
                default:
                    throw new Error(message.failure);
                    this.undoState2 = this.undoState;
                    this.undoState = this.stateStudent;
                    this.stateStudent = 'Error'
            }

        } else {
            throw new Error(message.failure);
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.undoState2 = this.undoState;
        this.undoState = this.stateStudent;
        this.stateStudent = this.configInit.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {

       if (event == null){
            return this.arrStates;
       }
       //return parent.parent.event;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        var rezult = false;

        if (this.undoState == null) {
            return rezult;
        }
        this.redoState2 = this.redoState;
        this.redoState = this.stateStudent;
        this.stateStudent = this.undoState;
        this.undoState = this.undoState2;
        rezult = true;

        return rezult;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        var rezult = false;
        if (this.redoState == null) {
            return rezult;
        }
        this.undoState2 = this.undoState;
        this.undoState = this.stateStudent;
        this.stateStudent = this.redoState;
        this.redoState = this.redoState2;

        rezult = true;

        return rezult;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoState2 = null;
        this.undoState = null;
        this.redoState = null;
        this.redoState2 = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
