import {AbstractLayer} from '../../core/layers/abstract.layer';
import {PaintLayer} from '../../core/layers/paint.layer';
import {Point} from '../../core/point';
import {FlipperPlatform} from '../../platforms/flipper';
import {AbstractTool} from './abstract.tool';

export class PaintTool extends AbstractTool {
    name = 'paint';

    createLayer(): AbstractLayer {
        const {session} = this.editor;
        return new PaintLayer(session.platforms[session.state.platform].features);
    }

    isSupported(platform: string): boolean {
        return platform !== FlipperPlatform.id;
    }

    onStopEdit(layer: AbstractLayer, position: Point, originalEvent: MouseEvent): void {
        // do nothing
    }

    onDeactivate(): void {
        if (this.editor.state.activeLayer) {
            this.editor.state.activeLayer.stopEdit();
            this.editor.state.activeLayer = null;
        }
    }
}
