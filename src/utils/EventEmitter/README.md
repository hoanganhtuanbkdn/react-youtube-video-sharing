## Usage Example

_Hint: The event listeners also work across different files. You only have to import the `EventRegister` in every file you need to send or receive your events._

```javascript
import { EventRegister } from 'react-native-event-listeners'

/*
 * RECEIVER COMPONENT
 */
class Receiver extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            data: 'no data',
        }
    }

    componentWillMount() {
        this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
            this.setState({
                data,
            })
        })
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    render() {
        return <Text>{this.state.data}</Text>
    }
}

/*
 * SENDER COMPONENT
 */
const Sender = (props) => (
    <TouchableHighlight
        onPress={() => {
            EventRegister.emit('myCustomEvent', 'it works!!!')
        })
    ><Text>Send Event</Text></TouchableHighlight>
)
```

## API

```javascript
// import
import { EventRegister } from 'react-native-event-listeners';
```

| static method       | return value      | description                                                    |
| :------------------ | :---------------- | :------------------------------------------------------------- |
| addEventListener    | string \| boolean | return value is the id of the event listener or false on error |
| removeEventListener | boolean           | true on success otherwise false                                |
| removeAllListeners  | boolean           | true on success otherwise false                                |
| emitEvent           | void              | no return value                                                |
| on                  | string \| boolean | **shorthand** for addEventListener                             |
| rm                  | boolean           | **shorthand** for removeEventListener                          |
| rmAll               | boolean           | **shorthand** for removeAllListeners                           |
| emit                | void              | **shorthand** for emitEvent                                    |
