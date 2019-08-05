import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends PureComponent {
  static defaultProps = {
    classNames: '',
    title: '',
    type: 'checkbox',
    active: false,
    disabled: false,
    trackValue: false
  };
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    classNames: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    trackValue: PropTypes.bool
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { active, trackValue } = nextProps;
    if (
      (trackValue || nextProps.type === 'radio') &&
      active !== prevState.active
    ) {
      return { active };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.active = this.active.bind(this);
    this.state = {
      active: props.active
    };
  }

  onChange = () => {
    const { trackValue, active: activeProps } = this.props;
    this.props.onChange(this.state.active);
    if (trackValue) return;
    this.setState(
      prevState => {
        let active = trackValue ? activeProps : !prevState.active;
        if (this.props.type === 'radio') {
          active = true;
        }
        return {
          active
        };
      },
      () => {
        this.props.onChange(this.state.active);
      }
    );
  };

  active = active => {
    this.setState({
      active
    });
  };

  render() {
    let classNames = this.props.type;
    if (this.state.active) classNames += ' active';
    if (this.props.classNames.length) classNames += ` ${this.props.classNames}`;
    if (this.props.disabled) classNames += ' disabled';
    return (
      <div
        title={this.props.title}
        className={classNames}
        disabled={this.props.disabled}
        onClick={() => {
          this.onChange();
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
export default Checkbox;
