import Svg, {
    Line,
    G,
    Path,
    Circle,
    ClipPath,
    Defs,
    Rect,
    Filter,
    LinearGradient,
    Stop,
    Mask,
    RadialGradient,
} from 'react-native-svg';
import SvgIcon from 'react-native-svg-icon';

const SVGIcon = props => {
    return <SvgIcon svgs={SVGS} {...props} />;
};

export default SVGIcon;

const SVGS = {
    LeftArrowBlack: {
        svg: (
            <G>
                <Path
                    d="M19 12L5 12"
                    stroke="#232323"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <Path
                    d="M11 18L5 12L11 6"
                    stroke="#232323"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </G>
        ),
        viewBox: '0 0 24 24',
    },
    // BACK: {
    //     svg: (
    //         <G>
    //             <Path d="M8 5L0.999938 12.0001L8 19.0001" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    //         </G>
    //     ), viewBox: "0 0 24 24",
    // },
    // DD:{
    //     svg:(
    //         <G>

    //         </G>
    //     )
    // }
}