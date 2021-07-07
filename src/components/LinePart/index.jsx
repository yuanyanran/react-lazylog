import { Component } from 'react';
import { func, object, shape, string } from 'prop-types';

/**
 * An individual segment of text within a line. When the text content
 * is ANSI-parsed, each boundary is placed within its own `LinePart`
 * and styled separately (colors, text formatting, etc.) from the
 * rest of the line's content.
 */
export default class LinePart extends Component {
  static propTypes = {
    /**
     * The pieces of data to render in a line. Will typically
     * be multiple items in the array if ANSI parsed prior.
     */
    part: shape({
      text: string,
    }).isRequired,
    /**
     * Execute a function against each line part's
     * `text` property in `data` to process and
     * return a new value to render for the part.
     */
    format: func,
    style: object,
  };

  static defaultProps = {
    format: null,
    style: null,
  };

  render() {
    const { format, part, style } = this.props;

    return (
      <span
        style={{
          ...style,
          backgroundColor: part.bg ? `rgb(${part.bg})` : undefined,
          color: part.fg ? `rgb(${part.fg})` : undefined,
          ...(part.decorations || []).reduce((p, c) => {
            const pieces = c.split(':');

            return {
              p,
              [pieces[0]]: pieces[1],
            };
          }, {}),
        }}>
        {format ? format(part.content) : part.content}
      </span>
    );
  }
}
