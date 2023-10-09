import {Layer} from 'src/core/layer';
import {Point} from '../../core/point';
import {Tool, ToolParamType} from './tool';

export class BoxTool extends Tool {
    name = 'box';

    params = [
        {
            name: 'x',
            type: ToolParamType.number,
            setValue(layer: Layer, value: number) {
                layer.position.x = value;
            },
            getValue(layer: Layer) {
                return layer.position.x;
            }
        },
        {
            name: 'y',
            type: ToolParamType.number,
            setValue(layer: Layer, value: number) {
                layer.position.y = value;
            },
            getValue(layer: Layer) {
                return layer.position.y;
            }
        },
        {
            name: 'w',
            type: ToolParamType.number,
            setValue(layer: Layer, value: number) {
                layer.size.x = value;
            },
            getValue(layer: Layer) {
                return layer.size.x;
            }
        },
        {
            name: 'h',
            type: ToolParamType.number,
            setValue(layer: Layer, value: number) {
                layer.size.y = value;
            },
            getValue(layer: Layer) {
                return layer.size.y;
            }
        }
    ];

    private firstPoint: Point;

    draw(layer: Layer): void {
        const {dc, position, size} = layer;
        dc.clear().rect(position, size, true);
    }

    edit(layer: Layer, position: Point, originalEvent: MouseEvent): void {
        layer.position = position.clone().min(this.firstPoint);
        layer.size = position.clone().subtract(this.firstPoint).abs();
        this.draw(layer);
    }

    startEdit(layer: Layer, position: Point, originalEvent: MouseEvent): void {
        layer.position = position.clone();
        this.firstPoint = position.clone();
    }

    stopEdit(layer: Layer, position: Point, originalEvent: MouseEvent): void {}
}