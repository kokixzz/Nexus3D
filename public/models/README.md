# 🏗️ 3D Models Directory

## Model Optimization Guide

### DRACO Compression

Voor optimale performance moeten alle GLTF/GLB modellen gecomprimeerd worden met DRACO:

```bash
# Install gltf-pipeline globally
npm install -g gltf-pipeline

# Compress with DRACO
gltf-pipeline -i erasmus-bridge.gltf -o erasmus-bridge.glb -d

# Or for existing GLB files
gltf-pipeline -i erasmus-bridge.glb -o erasmus-bridge-compressed.glb -d
```

### File Structure

```
public/models/
├── erasmus-bridge.glb          # Main detailed model
├── erasmus-bridge-lod1.glb     # Medium detail (50% polygons)
├── erasmus-bridge-lod2.glb     # Low detail (25% polygons)
├── dutch-tulip.glb             # Easter egg model
└── textures/
    ├── bridge-diffuse.webp
    ├── bridge-normal.webp
    └── bridge-roughness.webp
```

### Optimization Targets

- **File Size**: < 500KB per model
- **Polygons**: < 10K triangles for main model
- **Textures**: 512x512 WebP format
- **LOD Levels**: 3 levels (high, medium, low)

### Usage in Components

```tsx
import { useGLTF } from '@react-three/drei'

export function ErasmusModel() {
  const { nodes, materials } = useGLTF('/models/erasmus-bridge.glb', true)
  return <primitive object={nodes.bridge} />
}
```

### Performance Tips

1. **Use LOD**: Implement Level of Detail based on distance
2. **Texture Compression**: Use WebP/AVIF for textures
3. **Geometry Optimization**: Remove unnecessary vertices
4. **Material Merging**: Combine materials where possible 