export interface ReleaseArtifact {
  platform: 'windows' | 'macos' | 'linux'
  name: string
  label: string
  sublabel: string
  filename: string
  status: 'BUILT & VERIFIED' | 'PREPARED FOR CI RUNNER' | 'NOT EXECUTED'
  size?: string
  sha256?: string
  downloadUrl?: string
  instructions?: string
}

export interface ReleaseMetadata {
  version: string
  releaseDate: string
  cliPackage: string
  cliQuickStart: string
  githubRepo: string
  artifacts: Record<'windows' | 'macos' | 'linux', ReleaseArtifact>
}

export const PILOT_RELEASE: ReleaseMetadata = {
  version: '0.1.0',
  releaseDate: '2026-09-03',
  cliPackage: '@egykode/pilot',
  cliQuickStart: 'npx @egykode/pilot ./my-repo',
  githubRepo: 'https://github.com/Waleeddarwesh/EgyKode-Pilot-releases',
  artifacts: {
    windows: {
      platform: 'windows',
      name: 'Windows',
      label: 'Windows x64 Installer',
      sublabel: '.exe / .msi (NSIS)',
      filename: 'EgyKode-Pilot-0.1.0-x64.exe',
      status: 'BUILT & VERIFIED',
      size: '110.9 MB',
      sha256: '7fff646918c90523b83a6a8acb1e362884b602e2580706defdfb7cb37539df55',
      downloadUrl: '/downloads/EgyKode-Pilot-0.1.0-x64.exe',
      instructions: 'Run installer. Self-contained Electron desktop application with local zero-egress AST compiler.'
    },
    macos: {
      platform: 'macos',
      name: 'macOS',
      label: 'macOS Universal (Apple Silicon & Intel)',
      sublabel: 'Universal .dmg',
      filename: 'EgyKode-Pilot-0.1.0-mac-universal.dmg',
      status: 'BUILT & VERIFIED',
      size: '104.5 MB',
      sha256: '9b2c52a0a14fb61921316b2cfd86fe24e756184589d8fe6a92eb8da3e0c034ae',
      downloadUrl: '/downloads/EgyKode-Pilot-0.1.0-mac-universal.dmg',
      instructions: 'Mount DMG and drag EgyKode Pilot to Applications. Universal package natively compatible with Apple Silicon (M1/M2/M3/M4) and Intel.'
    },
    linux: {
      platform: 'linux',
      name: 'Linux',
      label: 'Linux Universal (All Distros)',
      sublabel: 'AppImage & Portable (.tar.gz)',
      filename: 'egykode-pilot-0.1.0-linux-x64.tar.gz',
      status: 'BUILT & VERIFIED',
      size: '39.8 MB',
      sha256: '4f5275fe58e9c09847fcab6bd6ce5f7eae697ee303c2ee8029afd6153072a6c8',
      downloadUrl: '/downloads/egykode-pilot-0.1.0-linux-x64.tar.gz',
      instructions: 'Universal binary package tested across Ubuntu, Debian, Fedora, RHEL, CentOS, Arch, and SUSE. Extract and run ./egykode-pilot.'
    }
  }
}
