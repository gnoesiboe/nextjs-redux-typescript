<?php

namespace Deployer;

require 'recipe/common.php';
require 'freshheads-recipes/deploy-tasks.php';

// Configuration
set('application', 'freshheads-nextjs-boilerplate');
set('repository', 'git@github.com:gnoesiboe/nextjs-redux-typescript.git');
set('shared_files', []);
set('shared_dirs', []);
set('writable_dirs', []);
set('allow_anonymous_stats', false);
set('keep_releases', 3);
set('ssh_type', 'native');
set('ssh_multiplexing', true);
set('build_path', 'build');
set('env_vars', '');
set('rsync_options', []);

// Stage specific configuration
host('test.dev.freshheads.local')
    ->stage('test')
    ->user('test')
    ->set('deploy_path', '~/www/nextjs-redux-typescript');

// @todo add other stages

// Application specific tasks
task('app.rsync', function () {
    $originalBuildPath = get('build_path');

    set('build_path', "{$originalBuildPath}/out");

    invoke('fh:deploy:rsync');

    set('build_path', $originalBuildPath);
});

task('app.export', function () {
    $buildPath = get('build_path');
    $targetEnv = input()->getArgument('stage') ?: 'prod';

    runLocally("cd {{build_path}} && npm run export", [
        'tty' => true
    ]);
});

task('app:deploy:symlink-webdir', function () {
    run('cd {{deploy_path}} && {{bin/symlink}} current web');
});

desc('Deploy your project');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'fh:deploy:export',
    'fh:deploy:npm-install',
    'app.export',
    'app.rsync',
    'deploy:shared',
    'deploy:writable',
    'deploy:clear_paths',
    'deploy:symlink',
    'app:deploy:symlink-webdir',
    'deploy:unlock',
    'fh:deploy:remove-export-dir',
    'cleanup',
    'success'
]);
